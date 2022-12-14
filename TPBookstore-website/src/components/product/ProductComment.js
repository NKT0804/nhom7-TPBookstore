import React, { useEffect, useCallback, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../base/LoadingError/Error";
import {
  createProductComment,
  createProductCommentReply,
  deleteProductComment,
  listCommentProduct,
  updateCommentProduct
} from "../../Redux/Actions/productActions";
import {
  PRODUCT_CREATE_COMMENT_FAIL,
  PRODUCT_CREATE_COMMENT_REPLY_FAIL,
  PRODUCT_CREATE_COMMENT_REPLY_RESET,
  PRODUCT_CREATE_COMMENT_RESET
} from "../../Redux/Constants/productConstants";
import Modal from "../base/modal/Modal";

const ProductComment = (props) => {
  const { userInfo, productId } = props;
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [usernameComment, setUsernameComment] = useState("");
  const [contentFirstReply, setContentFirstReply] = useState("");
  const [checkIdReplyComment, setCheckIdReplyComment] = useState(null);
  const [isEditComment, setIsEditComment] = useState(false);
  const [commentIdDelete, setCommentIdDelete] = useState("");

  const getCommentProduct = useSelector((state) => state.productComment);
  const { comments } = getCommentProduct;

  const notifiCreateProductComment = useSelector((state) => state.productCreateComment);
  const { success: successCreateComment, error: errorCreateComment } = notifiCreateProductComment;

  const notifiCreateProductCommentReply = useSelector((state) => state.productCreateCommentReply);
  const { success: successCreateCommentReply, error: errorCreateCommentReply } = notifiCreateProductCommentReply;

  const loadListCommentProduct = useCallback(() => {
    dispatch(listCommentProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (usernameComment !== "") {
      setContentFirstReply(`@${usernameComment} `);
    }
  }, [usernameComment]);

  const loadNotifiCreateProductComment = useCallback(() => {
    if (successCreateComment || successCreateCommentReply) {
      setContent("");
      setContentFirstReply(`@${usernameComment} `);
      setCheckIdReplyComment(null);
      loadListCommentProduct();
      dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
      dispatch({ type: PRODUCT_CREATE_COMMENT_REPLY_RESET });
    }
    if (errorCreateComment || errorCreateCommentReply) {
      dispatch({ type: PRODUCT_CREATE_COMMENT_FAIL });
      dispatch({ type: PRODUCT_CREATE_COMMENT_REPLY_FAIL });
    }
  }, [
    dispatch,
    successCreateComment,
    errorCreateComment,
    successCreateCommentReply,
    errorCreateCommentReply,
    usernameComment,
    loadListCommentProduct
  ]);

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = "../images/avatar/default.png";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductComment({
        productId,
        content
      })
    );
  };

  const onEditCommentHandler = (id) => {
    let contentFirstReplyEdit = comments?.find((idContentFirst) => idContentFirst._id === id);
    setIsEditComment(true);
    setCheckIdReplyComment(id);
    setContentFirstReply(contentFirstReplyEdit?.content);
  };

  const onEditCommentReplyHandler = (reply) => {
    let contentFirstReply = comments
      ?.find((idContent) => idContent._id === reply.parentComment)
      ?.replies.find((idContentFirstReply) => idContentFirstReply._id === reply._id);
    setIsEditComment(true);
    setCheckIdReplyComment(contentFirstReply?._id);
    setContentFirstReply(contentFirstReply?.content);
  };

  const submitReplyFirstLevelHandler = (e) => {
    e.preventDefault();
    if (isEditComment === true) {
      dispatch(
        updateCommentProduct({
          commentId: checkIdReplyComment,
          content: contentFirstReply
        })
      );
      setCheckIdReplyComment(null);
    } else {
      dispatch(
        createProductCommentReply({
          productId,
          content: contentFirstReply,
          parentCommentId: checkIdReplyComment
        })
      );
    }
  };

  const onCancelReplyHandler = () => {
    setCheckIdReplyComment(null);
    setContent("");
    setIsEditComment(false);
    setContentFirstReply(`@${usernameComment} `);
  };

  const onDeleteCommentHandler = () => {
    dispatch(deleteProductComment(commentIdDelete));
  };

  useEffect(() => loadListCommentProduct(), [loadListCommentProduct]);
  useEffect(() => loadNotifiCreateProductComment(), [loadNotifiCreateProductComment]);
  return (
    <div className="wrap-comment">
      <Modal
        modalTitle={"X??a B??nh lu???n"}
        modalBody={"B???n c?? ch???c mu???n x??a b??nh lu???n n??y?"}
        btnTitle={"X??a"}
        btnType={"delete"}
        handler={onDeleteCommentHandler}
      />
      <h3>B??nh lu???n s???n ph???m</h3>
      {userInfo ? (
        <form className="mt-3 mb-3 nav justify-content-end" onSubmit={submitHandler}>
          <textarea
            required
            placeholder="Nh???p b??nh lu???n"
            className="content-comment form-control"
            id="contentComment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-submit mt-3 btn-size p-2">
            ????ng b??nh lu???n
          </button>
        </form>
      ) : (
        <div className="my-3">
          <Message variant={"alert-warning"}>
            Vui l??ng{" "}
            <Link to={`/login?redirect=product/${productId}`}>
              " <strong>????ng nh???p</strong> "
            </Link>{" "}
            ????? b??nh lu???n{" "}
          </Message>
        </div>
      )}

      <div className="list-comment border border-info rounded">
        {comments?.length > 0 ? (
          comments?.map((item) => {
            return (
              <div value={item._id} key={item._id} className="comment-ask rounded">
                <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                  <img
                    className="img-xs rounded-circle p-1 border border-primary"
                    src={item.user.avatarUrl}
                    onError={onAvatarLoadError}
                    alt="User avatar"
                  />
                  <strong className="ms-2">{item.user.name}</strong>
                  <p className="fs-6 fst-italic">
                    Th???i gian:{" "}
                    {moment(item.createdAt).format("LT") + "  " + moment(item.createdAt).format("DD/MM/yyyy")}
                  </p>
                  <div className="alert alert-info p-2">{item.content}</div>

                  <div className="action-user">
                    {checkIdReplyComment === item._id ? (
                      userInfo ? (
                        <form className="mb-3" onSubmit={submitReplyFirstLevelHandler}>
                          <textarea
                            required
                            placeholder="Nh???p n???i dung tr??? l???i"
                            className="content-comment form-control"
                            value={contentFirstReply}
                            onChange={(e) => setContentFirstReply(e.target.value)}
                          ></textarea>
                          <div className="d-flex justify-content-between">
                            <b
                              className="mt-2 p-1 btn btn-danger btn-size cursor-pointer"
                              onClick={onCancelReplyHandler}
                            >
                              H???y
                            </b>
                            {isEditComment === true ? (
                              <button type="submit" className="p-1 mt-2 btn btn-warning btn-size">
                                C???p nh???t b??nh lu???n
                              </button>
                            ) : (
                              <button type="submit" className="p-1 mt-2 btn btn-primary btn-size">
                                Tr??? l???i
                              </button>
                            )}
                          </div>
                        </form>
                      ) : (
                        <div className="my-3">
                          <Message variant={"alert-warning"}>
                            Vui l??ng{" "}
                            <Link to={`/login?redirect=product/${productId}`}>
                              " <strong>????ng nh???p</strong> "
                            </Link>{" "}
                            ????? b??nh lu???n{" "}
                          </Message>
                        </div>
                      )
                    ) : (
                      <>
                        <b
                          value={checkIdReplyComment}
                          className="text-primary cursor-pointer"
                          onClick={() => {
                            setUsernameComment(item.user.name);
                            setCheckIdReplyComment(item._id);
                            setIsEditComment(false);
                          }}
                        >
                          Tr??? l???i
                        </b>
                        <div className="dropdown float-end">
                          <Link to="#" data-bs-toggle="dropdown" className="">
                            <i className="fas fa-ellipsis-h text-primary"></i>
                          </Link>
                          <div className="dropdown-menu">
                            {(userInfo?.isAdmin === true || userInfo?._id === item.user._id) && (
                              <>
                                <Link
                                  to="#"
                                  className="dropdown-item btn-size"
                                  onClick={() => onEditCommentHandler(item._id)}
                                >
                                  S???a b??nh lu???n
                                </Link>
                                <Link
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="dropdown-item btn-size"
                                  onClick={() => setCommentIdDelete(item._id)}
                                >
                                  X??a b??nh lu???n
                                </Link>
                              </>
                            )}
                            <Link to="#" className="dropdown-item btn-size">
                              B??o c??o
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {item?.replies.map((reply) => {
                    return (
                      <div key={reply._id} className="comment-reply">
                        <img
                          className="img-xs rounded-circle p-1"
                          src={reply.user.avatarUrl}
                          onError={onAvatarLoadError}
                          alt="User avatar"
                        />
                        <strong className="ms-2">{reply.user.name}</strong>
                        <div className="fs-6 fst-italic">
                          Th???i gian:{" "}
                          {moment(reply.createdAt).format("LT") + "  " + moment(reply.createdAt).format("DD/MM/yyyy")}
                        </div>
                        <div className="alert alert-info p-2">{reply.content}</div>
                        <div className="action-user">
                          {checkIdReplyComment === reply._id ? (
                            userInfo ? (
                              <form className="mb-3" onSubmit={submitReplyFirstLevelHandler}>
                                <textarea
                                  required
                                  placeholder="Nh???p n??i dung tr??? l???i"
                                  className="content-comment form-control"
                                  value={contentFirstReply}
                                  onChange={(e) => setContentFirstReply(e.target.value)}
                                ></textarea>
                                <div className="d-flex justify-content-between">
                                  <b
                                    className="mt-2 p-1 btn btn-danger btn-size cursor-pointer"
                                    onClick={onCancelReplyHandler}
                                  >
                                    H???y
                                  </b>
                                  {isEditComment === true ? (
                                    <button type="submit" className="p-1 mt-2 btn btn-warning btn-size">
                                      C???p nh???t b??nh lu???n
                                    </button>
                                  ) : (
                                    <button type="submit" className="p-1 mt-2 btn btn-primary btn-size">
                                      Tr??? l???i
                                    </button>
                                  )}
                                </div>
                              </form>
                            ) : (
                              <div className="my-3">
                                <Message variant={"alert-warning"}>
                                  Vui l??ng{" "}
                                  <Link to={`/login?redirect=product/${productId}`}>
                                    " <strong>????ng nh???p</strong> "
                                  </Link>{" "}
                                  ????? b??nh lu???n{" "}
                                </Message>
                              </div>
                            )
                          ) : (
                            <>
                              <b
                                value={checkIdReplyComment}
                                className="text-primary cursor-pointer"
                                onClick={() => {
                                  setUsernameComment(reply.user.name);
                                  setCheckIdReplyComment(reply._id);
                                }}
                              >
                                Tr??? l???i
                              </b>
                              <div className="dropdown float-end">
                                <Link to="#" data-bs-toggle="dropdown" className="">
                                  <i className="fas fa-ellipsis-h text-primary"></i>
                                </Link>
                                <div className="dropdown-menu">
                                  {(userInfo?.isAdmin === true || userInfo?._id === reply.user._id) && (
                                    <>
                                      <Link
                                        to="#"
                                        className="dropdown-item btn-size"
                                        onClick={() => onEditCommentReplyHandler(reply)}
                                      >
                                        S???a b??nh lu???n
                                      </Link>
                                      <Link
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                        className="dropdown-item btn-size"
                                        onClick={() => setCommentIdDelete(reply._id)}
                                      >
                                        X??a b??nh lu???n
                                      </Link>
                                    </>
                                  )}
                                  <Link to="#" className="dropdown-item btn-size">
                                    B??o c??o
                                  </Link>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-2 bg-light border">Kh??ng c?? b??nh lu???n n??o cho s???n ph???m n??y</div>
        )}
      </div>
    </div>
  );
};

export default ProductComment;

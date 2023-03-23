import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../../redux/ReduxSlice";
import "./Blog.css";
function Blog() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs.posts);
  const [blog, setBlogs] = useState([]);
  const [comment, setComment] = useState("");
  const titleRef = useRef();
  const descRef = useRef();
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  // On First Render FetchBlogs Action Will Call
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  useEffect(() => {
    if (blogs !== undefined) {
      let temp = [];
      // eslint-disable-next-line array-callback-return
      blogs.map((val) => {
        let obj = {
          id: val.id,
          title: val.title,
          body: val.body,
          like: false,
          comment: [],
        };
        temp.push(obj);
      });
      setBlogs(temp);
    }
  }, [blogs]);
  // Like Handler Function
  const likeHandler = (e, id) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("loginUser")) === null) {
      alert("Firstly Login Into Your Account");
      navigate("/signin");
    } else {
      // eslint-disable-next-line array-callback-return
      blog.map((val) => {
        if (val.id === id) {
          if (val.like === false) val.like = true;
          else val.like = false;
        }
      });
      setBlogs([...blog]);
    }
  };
  const inputHandler = (e) => {
    setComment(e.target.value);
  };
  // Comment Handler Function
  const commentHandler = (e, id) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("loginUser")) === null) {
      alert("Firstly Login Into Your Account");
      navigate("/signin");
    } else if (comment === "") {
      alert("Blank Field Can Not Be Added");
    } else {
      let tempComment = [];
      // eslint-disable-next-line array-callback-return
      blog.map((val) => {
        if (val.id === id) {
          tempComment = val.comment;
          tempComment.push(comment);
          val.comment = tempComment;
        }
      });
      setBlogs([...blog]);
      setComment("");
    }
  };
  // Delete Handler Function
  const deleteHandler = (e, id) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("loginUser")) === null) {
      alert("Firstly Login Into Your Account");
      navigate("/signin");
    } else {
      let check = window.confirm("Are You Sure ?");
      if (check === true) {
        // eslint-disable-next-line array-callback-return
        blog.map((val, index) => {
          if (val.id === id) {
            blog.splice(index, 1);
          }
        });
        setBlogs([...blog]);
      }
    }
  };
  // Add Post Handler
  const addHandler = () => {
    if (JSON.parse(localStorage.getItem("loginUser")) === null) {
      alert("Firstly Login Into Your Account");
      navigate("/signin");
    } else if (titleRef.current.value === "") {
      setMessage("Title Field Can Not Be Empty !!");
      titleRef.current.focus();
    } else if (descRef.current.value === "") {
      setMessage("Description Field can Not Be Empty !!");
      descRef.current.focus();
    } else {
      setMessage("");
      let obj = {
        id: Math.floor(Math.random() * 1000),
        title: titleRef.current.value,
        body: descRef.current.value,
        like: false,
        comment: [],
      };
      setBlogs([obj, ...blog]);
      titleRef.current.value = "";
      descRef.current.value = "";
    }
  };
  // Edit Handler
  const editHandler = (e, id) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("loginUser")) === null) {
      alert("Please Login");
      navigate("/signin");
    } else {
      let check = window.confirm("Are You Sure ?");
      if (check === true) {
        window.scroll({ top: 0, behavior: "smooth" });
        // eslint-disable-next-line array-callback-return
        blog.map((val, index) => {
          if (val.id === id) {
            titleRef.current.value = val.title;
            descRef.current.value = val.body;
            let obj = {
              id: Math.floor(Math.random() * 1000),
              title: titleRef.current.value,
              body: descRef.current.value,
              like: false,
              comment: [],
            };
            blog.splice(index, 1, obj);
          }
        });
        setBlogs([...blog]);
      }
    }
  };
  return (
    <div style={{ marginTop: "6.5em" }}>
      <div
        style={{ width: "50%", margin: "auto", padding: "1em" }}
        className="card"
      >
        <div className="input-group mb-3">
          <input
            ref={titleRef}
            type="text"
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            Title
          </span>
        </div>
        <div className="input-group">
          <textarea
            ref={descRef}
            style={{ height: "250px" }}
            className="form-control"
            placeholder="Type Description..."
            aria-label="With textarea"
          ></textarea>
        </div>
        <br></br>
        <button
          onClick={addHandler}
          className="btn btn-outline-primary"
          type="button"
        >
          POST
        </button>
      </div>
      {message !== "" ? (
        <div
          style={{ width: "50%", margin: "auto" }}
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      ) : null}
      <br></br>
      {blog.length === 0 ? (
        <div className="loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      ) : (
        blog.map((val) => (
          <main key={val.id}>
            <div
              key={val.id}
              style={{ width: "50%", margin: "auto" }}
              className="card"
            >
              <div className="card-body">
                <h5 className="card-title text-center">{val.title}</h5>
                <hr></hr>
                <p className="card-text">{val.body}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <i
                    onClick={(e) => likeHandler(e, val.id)}
                    className={`${
                      val.like === false ? "far fa-heart" : "fas fa-heart like"
                    }`}
                  ></i>
                  <i
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${val.id}`}
                    className="far fa-comment"
                  ></i>
                  <i
                    onClick={(e) => editHandler(e, val.id)}
                    className="material-icons"
                  >
                    edit
                  </i>
                  <i
                    onClick={(e) => deleteHandler(e, val.id)}
                    className="material-icons"
                  >
                    delete
                  </i>
                </div>
                <div
                  className="modal fade"
                  id={`exampleModal${val.id}`}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Comment Box
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={inputHandler}
                            value={comment}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={(e) => commentHandler(e, val.id)}
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {val.comment.length !== 0 ? (
                  <ul
                    style={{ height: "100px", overflow: "auto" }}
                    className="list-group"
                  >
                    <p className="text-center">Comments</p>
                    {val.comment.map((val, index) => (
                      <li key={index} className="list-group-item mb-1">
                        {val}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <br></br>
          </main>
        ))
      )}
    </div>
  );
}

export default Blog;

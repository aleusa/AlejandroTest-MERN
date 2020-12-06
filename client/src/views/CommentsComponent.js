import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

export default function Comments(props) {
  const { userData, setUserData } = useContext(UserContext);
  const [commentsArray, setCommentsArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    if (!userData.user) props.history.push("/login");

    //query the database to autopopulate component with comments related to this vessel
    const findComments = async (index) => {
        let associatedComments = await Axios.post("http://localhost:5000/users/getComment",
        { vesselID: userData.currVessel.id,
          i: index
        }); 
      
        if(associatedComments){
            console.log("got: " + associatedComments.data.comment);
            let commentObject = ({poster: ""+associatedComments.data.poster, date:""+associatedComments.data.postedDate, comment: ""+associatedComments.data.comment} );
            commentsArray.push(commentObject); 
        }else{
            console.log("didnt work");
        }
    }

    if(userData.user && userData.currVessel && commentsArray.length === 0){
        //add to array of all associated comments:
        for(let i = 0; i < userData.currVessel.numComments; i++){
            findComments(i);
            console.log("finding " + userData.currVessel.numComments + " comments..." )
        }
      }
    }); 

    //use this function to force refresh component when a new comment is posted:
    function refreshPage() {
        if(refresh){
            setRefresh(false);
        }else{
            setRefresh(true);
        }
    }

const postCommentToDatabase = async (content) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    today = new Date().toLocaleString();

    let postCommentResponse = await Axios.post("http://localhost:5000/users/postComment",
    { vesselID: userData.currVessel.id,
      posterID: userData.user.id,
      date: today,
      content: content
    });

    if(postCommentResponse){
        console.log("posted!");
        let updatedVessel = userData.currVessel;
        updatedVessel.numComments = parseInt(userData.currVessel.numComments, 10)+1;
        if(userData){
            setUserData({
              token: userData.user.token,
              user: userData.user,
              currVessel: updatedVessel
            });
            
        }
        setCommentsArray([]);
    }
}

const deleteCommentFromDB = async (date) => {

    let delCommentResponse = await Axios.post("http://localhost:5000/users/deleteComment",
    { vesselID: userData.currVessel.id,
      date: date
    });
    if(delCommentResponse){
        console.log("deleted!");
        let updatedVessel = userData.currVessel;
        updatedVessel.numComments = parseInt(userData.currVessel.numComments, 10)-1;
        if(userData){
            setUserData({
              token: userData.user.token,
              user: userData.user,
              currVessel: updatedVessel
            });
            
        }
        setCommentsArray([]);
    }
}

const del = (event) => {
    //delete the comment that the user clicked on:
    event.preventDefault();
    const date = event.target.id;
    if(date){
        console.log("clicked: " + event.target.id); //the comment id is just the comment content itself
        deleteCommentFromDB(date);
    }
    
}

const postComment = () => {
    console.log("posting " + commentText);
    postCommentToDatabase(commentText);
}

  if (userData.user){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    today = new Date().toLocaleString();

    let listOfComments = commentsArray.map(comment =>
        `<li class="clearfix">
        <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
        <div class="post-comments">
            <p class="meta" >${comment.date + "  "}<a href="#">${comment.poster}</a> says: <i class="pull-right">
            <button id="${comment.date}" style="float: right;">x</button></i>
            <p>
                ${comment.comment}
            </p>
        </div>
      </li>
        `
      ).join('');

    if(commentsArray.length > 0){
        return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta"> {today} <a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div  onClick={del} dangerouslySetInnerHTML={{__html: listOfComments}}></div>
                        <div class="form-group">
                        
                        <label for="comment"></label>
                        <textarea onChange={(e) => setCommentText(e.target.value)} placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        <div class="float-right"><button onClick={postComment} class="btn btn-primary" type="submit">Post Comment</button></div>
                        </div>
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }else if(userData.currVessel.numComments > 0){
        //finish loading comments
        setTimeout(function() { refreshPage(); }, 1000);
        return(      
            <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        );
    }else{
        return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta"> {today} <a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div class="form-group">
                        
                        <label for="comment"></label>
                        <textarea onChange={(e) => setCommentText(e.target.value)} placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        <div class="float-right"><button onClick={postComment} class="btn btn-primary" type="submit">Post Comment</button></div>
                        </div>
                        
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
    } else{
        /* return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta">12/3/2020<a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div class="form-group">
                        <label for="comment"></label>
                        <textarea placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <div class="float-right"><button class="btn btn-primary" type="submit">Post Comment</button></div>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        ); */
        return(null);
    }
}
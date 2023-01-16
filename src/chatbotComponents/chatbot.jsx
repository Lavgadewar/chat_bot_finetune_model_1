import "./chatbot.css";
import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BiBot, BiUser } from "react-icons/bi";

function Basic() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  //   const [data, setData] = useState([]);
  let arr = [];
  //   let arru = [];

  console.log("lav", arr);
  useEffect(() => {
    // console.log("called", chat);
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);
  console.log("called", chat);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "lav";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };
    console.log("lav i am at submit");
    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      // console.log("chat",chat)
      setbotTyping(true);
      setInputMessage("");
      // rasaAPI(name,inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const getOpenAIRespoense = () => {
    arr.push("USER:" + inputMessage);
    console.log("lav login arry" + arr.join());
    openai
      .createCompletion({
        model: "davinci:ft-personal-2023-01-14-08-49-42",
        prompt: arr.join() + "\n JAX:",
        max_tokens: 100,
        temperature: 0.7,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["USER:"],
      })
      .then((response) => {
        console.log("lavv2", response);
        if (response.data.choices) {
          response.data.choices.map((item) => {
            const response_temp = {
              sender: "bot",
              recipient_id: 1,
              msg: item.text,
            };
            setbotTyping(false);

            setChat((chat) => [...chat, response_temp]);
          });
        }
      });
  };
  const stylecard = {
    maxWidth: "35rem",
    border: "1px solid black",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    borderRadius: "30px",
    boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
  };
  const styleHeader = {
    height: "4.5rem",
    borderBottom: "1px solid black",
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: "#282c34",
  };
  const styleFooter = {
    //maxWidth : '32rem',
    borderTop: "1px solid black",
    borderRadius: "0px 0px 30px 30px",
    backgroundColor: "#282c34",
  };
  const styleBody = {
    paddingTop: "10px",
    height: "28rem",
    overflowY: "a",
    overflowX: "hidden",
  };

  return (
    <div>
      <div className="container parent">
        <div className=" flex justify-content-center allin">
          <div className="card child" style={stylecard}>
            <div className="cardHeader text-white" style={styleHeader}>
              <h1 style={{ margin: "0px", color: "white" }}>
                career counselor
              </h1>

              {botTyping ? <h6>Bot Typing....</h6> : null}
            </div>
            <div className="cardBody" id="messageArea" style={styleBody}>
              {/* {console.log("chat",chat)} */}

              <div className="row msgarea">
                {/* {console.log("kush",chat)} */}
                {chat.map((user, key) => {
                  if (user.sender === "bot") {
                    // arr[key]=user.msg

                    arr.push("JAX:" + user.msg);
                    console.log("RESPONSE", arr);
                  }
                  if (user.sender === "user") {
                    arr[key] = user.msg;
                    arr.push("\n USER:" + user.msg);
                    // arr.push({...arr,user:user.msg});
                    console.log(arr, "arr");
                  }
                  return (
                    <div key={key}>
                      {user.sender === "bot" ? (
                        <div className="msgalignstart">
                          <BiBot className="botIcon" />
                          <h5 className="botmsg">
                            <div>{user.msg}</div>
                          </h5>
                        </div>
                      ) : (
                        <div className="msgalignend">
                          <h5 className="usermsg">{user.msg}</h5>
                          <BiUser className="userIcon" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cardFooter text-white" style={styleFooter}>
              <div className="row">
                <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                  <div className="col-10" style={{ paddingRight: "0px" }}>
                    <input
                      onChange={(e) => setInputMessage(e.target.value)}
                      value={inputMessage}
                      type="text"
                      className="msginp"
                    ></input>
                  </div>
                  <div className="col-2 cola">
                    <button
                      type="submit"
                      onClick={getOpenAIRespoense}
                      className="circleBtn"
                    >
                      <IoMdSend className="sendBtn" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;

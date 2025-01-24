import React, { useEffect, useState, useRef } from "react";

import Homepage_Btn from './Homepage_Btn.js'
import DateCalculator from "./DateCalculator.js";
import Delete_popup from "./Delete_popup.js";

import { Buffer } from "buffer";

import Editbtn from '../../../../src/1_image_or_icon/pen2.png'
import ArrowBtn from '../../../../src/1_image_or_icon/Arrow_Button_DownAhead.png'
import Trashcanbtn from '../../../../src/1_image_or_icon/recycle-bin-icon.png'
import './CustomCheckbox.css';

export const My_Reviews = (props) => {

    const containerRef = useRef(null)

    const [ELEMENT ,updateREVIEWS] = useState([])
    const [USERNAME ,updateUSERNAME] = useState({name: ''})
    
    const [Delete_popup_Activate, setDelete_popup_state] = useState(false)
    const [Delete_review, setDelete_review] = useState({})
    
    useEffect(()=>{

        let USER;
        let STATUS;
        
        if(props.id){
            USER = props.id.userinfo
            STATUS = props.id.status
        }

        switch(STATUS){
            case('unverified'):
            break;

            case('verified'):
            Load_Review(USER.id,USER.name)
            break;

            default:
            break;
        }
        const Container = containerRef.current
        if(!Container) return;

    },[props])

    const TextDispenser = (props) => {
        let TextContent = props.element.user_post_text
        
        return <React.Fragment>
            <div
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                width: '80%',
                height: '5vh',
                overflow: 'hidden',
                padding: '1vh 2.5vw 4vh 2.5vw',
                justifySelf: 'center',
                letterSpacing: '1.5px',
                wordSpacing: '1px',
                lineHeight: '3.5vh',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                maskImage: 'linear-gradient(black, transparent)',
                transition: 'all 0.3s ease-in-out'
            }}
            >
                {TextContent}
            </div>
            <img
            src={ArrowBtn}
            style={{
                position: 'relative',
                width: '5vw',
                bottom: '4vh',
                justifySelf: 'center',
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out'
            }}
            onClick={(e)=>{
                const textDiv = e.target.previousElementSibling;
                switch(textDiv.style.maskImage){
                    case(''):
                    textDiv.style.maskImage = 'linear-gradient(black, transparent)';
                    textDiv.style.height = '5vh';
                    e.target.style.transform = 'rotate(0deg)';
                    break;

                    case('linear-gradient(black, transparent)'):
                    textDiv.style.maskImage = '';
                    textDiv.style.height = `${textDiv.scrollHeight}px`;
                    e.target.style.transform = 'rotate(180deg)';
                    break;
                }
            }}
            ></img>
        </React.Fragment>
    }

    const Review_Container = (props) => {

        const ELEMENT = props.ELEMENT

        return <React.Fragment>

            <label>

            <div
            style={{
                width:'95%',

                display: 'grid',
                gridTemplateColumns: '(repeat 1, 1fr)',
                rowGap: '2vh',
                

                padding: '2vh 0vw'
            }}
            >

            {ELEMENT.map((element, index)=>{

                const PICTURES_BINARY_ARRAY = element.user_post_pictures
                let PICTURES_ARRAY = [];

                PICTURES_BINARY_ARRAY.forEach((element, index)=>{
                    const DATA = Buffer.from(element)
                    let encoded_imagesrc = DATA.toString('base64')
                    encoded_imagesrc = `data:image/jpg;base64,${encoded_imagesrc}`;

                    PICTURES_ARRAY = [...PICTURES_ARRAY, encoded_imagesrc]
                })

                return <div>
                <div
                
                style={{
                    display: 'grid',
                    gridTemplateColumns: '(repeat 1, 1fr)',
                    rowGap: '1vh',
                    border:'black solid 3px',
                    borderRadius: '28px',
                    padding: '1.5vh 3vw 3vh 3vw',
                    transition: 'all 0.3s ease-in-out'
                }}
                >

                <input
                className="custom-checkbox"
                type="checkbox"
                onChange={(e)=>{}}
                />

                <div
                    style={{
                        justifySelf:'center'
                    }}
                >
                    {element.placename}
                </div>

                <TextDispenser
                element={element}
                />

                <div
                style={{
                    position:'relative',
                    bottom: '15px',
                    justifySelf: 'center'
                }}
                >
                    {`작성자: ${USERNAME.name}`}
                </div>

                <div
                style={{
                    fontSize:'15px',
                    justifySelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '0.25vh 2vw'
                }}
                >
                    Created
                </div>

                <div
                style={{
                    width: '70%',
                    justifySelf: 'center',
                    borderBottom: 'white solid 5px',
                    textAlign: 'center'
                }}
                >
                    <DateCalculator
                    date={element.created_at}
                    />
                </div>

                <img
                src=''
                style={{
                    display:'none',
                    width: '80%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    justifySelf: 'center',
                    border: 'white solid 3px',
                    borderRadius: '10px'
                }}
                alt="let"
                onClick={(e)=>{
                    e.target.style.display = 'none'
                }}
                >
                </img>

                <div
                style={{
                    
                    width:'80%',

                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    justifyItems: 'center',
                    justifySelf: 'center',
                    alignItems: 'center',
                    border: 'black solid 3px',
                    borderRadius:'15px',

                    padding: '1.5vh 2vw',
                    columnGap: '2vw',
                    rowGap: '1.5vh'
                }}
                >
                    
                    {PICTURES_ARRAY.map((element, index)=>{

                        return <img
                        src={`${element}`}
                        style={{
                            width: '80%',
                            aspectRatio: '1',
                            border:'white solid 3px',
                            borderRadius: '10px'
                        }}
                        
                        onClick={(e)=>{
                            const Target = e.target.parentNode.previousElementSibling
                            Target.style.display = 'block'
                            Target.src = e.target.src
                        }}
                        >
                        </img>
                    })}
                </div>
                    
                        <div
                        style={{
                            width: '90%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            columnGap: '1vw',
                            justifySelf: 'center',
                            borderRadius: '5px',                        
                            margin: '1.5vh 0vw 0vh 0vw',
                            }}>
                                <div
                                style={{
                                    justifySelf: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '7px',
                                    padding: '0.5vh 2.5vw'  
                                }}
                                >
                                    <span>
                                        Edit
                                    </span>
                                    
                                    <img
                                    src={Editbtn}
                                    style={{
                                        position:'relative',
                                        left:'5.5px',

                                        width: '15px',
                                        height: '15px'
                                    }}
                                    >
                                    </img>
                                </div>
                                <div
                                style={{
                                    justifySelf: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '7px',
                                    padding: '0.5vh 2.5vw'  
                                }}
                                onClick={
                                    async (e)=>{
                                    setDelete_popup_state(true)
                                    setDelete_review({
                                        id: element.id,
                                        index: index
                                    })
                                    
                                }}

                                >
                                    <span>
                                        Delete
                                    </span>
                                    
                                    <img
                                    src={Trashcanbtn}
                                    style={{
                                        position:'relative',
                                        left:'5.5px',

                                        width: '15px',
                                        height: '15px'
                                    }}
                                    >
                                    </img>
                                </div>

                        </div>
                </div>
                </div>

            })}

            <Delete_popup
            activate={Delete_popup_Activate}
            index={Delete_review.index}
            click_action={async ()=>{
                await fetch('/usercreation/delete_post',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: Delete_review.id})
                })
                let RENEWED_ALIGN = ELEMENT
                RENEWED_ALIGN.splice(Delete_review.index, 1)
                updateREVIEWS([...RENEWED_ALIGN])
            }}
            close_event={()=>{
                setDelete_popup_state(false)
            }}
            />

            </div>

            
            </label>
        </React.Fragment>

    }

    const Load_Review = async (user_id, username) => {
        await fetch(`/usercreation/read_reviews/${user_id}`).then( async (result)=>{
            const review_data = await result.json()
            updateREVIEWS(review_data.result)
            updateUSERNAME({name: username})
        })
    }

    if(props.id){
        
        switch(props.id.status){
        case('verified'):
        return <React.Fragment>

        <div
        className="Personalize_Data_Page_Container"
        >

            <Homepage_Btn/>

            <div
            className="Personalized_Data_Container_Aligner"
            >

                <span
                className="Personalized_Data_Page_TextTitle"
                >
                My Reviews
                </span>
                <br></br>


                <Review_Container
                ELEMENT={ELEMENT}
                />
                

            </div>

        </div>

    </React.Fragment>

    case('unverified'):
    return <React.Fragment>

            <div
            className="Personalize_Data_Page_Container"
            >

                <Homepage_Btn/>

                <div
                className="Personalized_Data_Container_Aligner"
                >

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    My Reviews
                    </span>
                    <br></br>

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    This Page
                    <br></br>
                    is Preparing
                    </span>                    

                </div>

            </div>

        </React.Fragment>


    }


    }
}

export default My_Reviews
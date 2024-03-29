import React, { useEffect, useState } from "react";
import useNavigateToLink from "../../hooks/navigateToLink";
import { useTextStore } from "../states/textStore";
import Popup from "./Components/Popup";
import TextPagination from "./Components/TextPagination";
import TextStats from "./Components/TextStats";
import { AddedTextStore } from "./Store/AddedTextStore";
import { PopupStore } from "./Store/PopupStore";

import { Stack } from "@mui/material";
import { TextStyles } from "../_assets/css/TextStyles";

import MenuTop from "./Components/MenuTop";
import TextViewWrapper from "./Components/TextViews/TextViewWrapper";
import SideBar from "./Components/SideBar";
import AnkiButWrapper from "./Components/AnkiButton/AnkiButWrapper";
import { SettingsLocalStorageSetup } from "./assets/SettingsLocalStorageSetup";
import { useSettingsVersion } from "./Components/TextViews/hooks/settingsVersion";
import { SettingsStore } from "./Store/SettingsStore";
import { LS } from "../_assets/db/LS";

/**
 * 
 * @returns page with text that was added to the DB, or selected by user 
 */
const AddedText = ()=>{

    /**
     * TODO: clean variables
     */
    const [navigator] = useNavigateToLink();
    const {currentText,currentTitle,currentLang} = useTextStore(s=>s);
    const [textForRender,setTextForRender] = useState<string>("");
    const [title,setTitle]= useState("");
    const [ver,setVer] = useState(0);
    const [p,setP] = useState(0);
    const curPage = AddedTextStore(s=>s.page);
    const getTextVersion = AddedTextStore(s=>s.counter);
    const hidePopUp = PopupStore(s=>s.hidePopup);
    const updateText = AddedTextStore(s=>s.updateText);
    const [forStats, setForStats] = useState<string[]>([]);
    const [statsUpdater,setStatsUpdater] = useState(0);
    const setPage = AddedTextStore(s=>s.setPage)

    const [settingsVer]=useSettingsVersion();
    const setFontSize = SettingsStore(s=>s.setFontSize);
    //need to update child component 
    useEffect(()=>{
        //remove all extra \n
        const textToRender = currentText.replace(/\n\s*\n/g, '\n');
        setTextForRender(textToRender);
        setTitle(currentTitle)
        const r = async()=>{
      
        }
    

    r();

    },[currentText,currentTitle,currentLang])

    // update child words after changing level of any word
    useEffect(()=>{
        console.log(getTextVersion);
        setVer(getTextVersion);
    },[getTextVersion])

   

    const handleMouseLeave=(e:React.MouseEvent)=>{
       
        hidePopUp();
    }
   


    /**
     * check settings. 
     */
    useEffect(()=>{
        SettingsLocalStorageSetup();
        let defParagraphs = LS.getParagraph();

        let defFontSize  = LS.getFontSize();
        setFontSize(defFontSize ||'text-base');
        console.log(defParagraphs,defFontSize);
    },[])

    
    return(<>
        <h1 className={`m-5 ${TextStyles.fontStyle} uppercase`}> {title}</h1>

        <div>
            <MenuTop />
        </div>

       
      
        <div onMouseOut={handleMouseLeave} 
            className={`bg-white border
            border-gray-300 rounded 
            p-3 
            mb-2 
            mt-5
            dark:bg-slate-500
            dark:border-gray-800
            `}>

            {currentLang==='jpn'? 
                        <TextViewWrapper lang={currentLang}  />
                    :
                        <TextViewWrapper lang={'spaced'}  />
            }

        </div>
        <div className="text-end">
            <Stack alignItems="center">
                <TextPagination key={`pagination-settings-update-${settingsVer}`} />
            </Stack>
        </div> 
        <div className="flex justify-between mb-10 mt-5">
            <div className={`text-start font-bold ${TextStyles.fontStyle}`}>
                <TextStats jpLangTexts={forStats} key={`stats-${statsUpdater}`} />
            </div>
            <div className="text-end">
                <AnkiButWrapper />
            </div>
        </div>
        <Popup />
    </>)
}


export default AddedText
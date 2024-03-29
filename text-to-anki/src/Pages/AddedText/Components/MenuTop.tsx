import useNavigateToLink from "../../../hooks/navigateToLink"
import { routsLinks } from "../../../routes/routsLinks"
import { FormStyles } from "../../_assets/css/FormStyles";
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { SettingsStore } from "../Store/SettingsStore";
import { useToggleSideBar } from "./TextViews/hooks/toggleSideBar";
import { useCheckHideLevels } from "./TextViews/hooks/useCheckHideLevels";
import { useTextStore } from "../../states/textStore";
import { IKnowAllButtonWrapper } from "./IKnowAllButton/IKnowAllButtonWrapper";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { AddedTextStore } from "../Store/AddedTextStore";

/**
 * 
 * @returns top menu component for added text
 */

const MenuTop = ()=>{
    const [navigator] = useNavigateToLink();
    const [handleToggleSideBar] =useToggleSideBar();
    const toggleHideLevel = SettingsStore(s=>s.toggleHideLevel);
    const [isHiddenLevels] = useCheckHideLevels();
    const [hiddenLevels,setHiddenLevels] = useState(isHiddenLevels);
    const {currentLang} = useTextStore(s=>s);
    const updateText = AddedTextStore(s=>s.updateText);
    const currentText = useTextStore(s=>s.currentText);
    const page =  AddedTextStore(s=>s.page);

    const handleHide=()=>{
        toggleHideLevel();
        setHiddenLevels(s=>!s);
    }

    const handleKnow = async()=>{
       
        //in future updates, there will be opportunity to add more languages. 
        const words = await IKnowAllButtonWrapper(currentLang==="jpn" ? 'jpn':'spaced',currentText,page);
        
        //3 is maximal level in this app. 
        await WordsModel.setMassLevel( words,3);
        updateText();

    }
   

    return(<div>
        <button onClick={handleToggleSideBar} className={`${FormStyles.buttonStyle} m-1`} title="settings"><SettingsIcon /></button>

        <button onClick={handleHide}  className={`${FormStyles.buttonStyle} m-1`} title="Hide/show levels">
            {hiddenLevels ?<><VisibilityIcon fontSize="small" /></>
            :
            <><VisibilityOffIcon fontSize="small"/></>            
        }
        </button>
        <button onClick={handleKnow}  className={`${FormStyles.buttonStyle} m-1`}>I know all</button>
        {/* for future update: 
        <button onClick={navigator(routsLinks.EDIT_TEXT)} className={FormStyles.buttonStyle}>Edit Text</button> */}
        <button onClick={navigator(routsLinks.NEW_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>Add new text</button>
        <button onClick={navigator(routsLinks.ALL_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>All texts</button>
    </div>)
}


export default MenuTop
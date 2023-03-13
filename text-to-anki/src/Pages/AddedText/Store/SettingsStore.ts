import { create } from "zustand";
import { paragraphsPerPageDefault } from "../Components/WordSettings";

interface SettingsStoreInterface{
    settingsVersion:number, // this var need to update child components of text. 
    isSidebar:boolean,
    fontSize:string,
    isHideLevels:boolean,
    paragraphsPerPage:number,
    updateSettingsVersion:()=>void,
    toggleSidebar:()=>void,
    setFontSize:(size:string)=>void, //here are using css tailwind text sizes.
    toggleHideLevel:()=>void, 
    setParagraphsPerPage:(n:number)=>void,
}

export const SettingsStore= create<SettingsStoreInterface>((set,get)=>({
    settingsVersion:0,
    isSidebar:false,
    fontSize:"text-base",
    isHideLevels:false,
    paragraphsPerPage:paragraphsPerPageDefault,
    updateSettingsVersion:()=>{set((state)=>({settingsVersion:state.settingsVersion+1}))},
    
    toggleSidebar:()=>{set((state)=>({isSidebar:!state.isSidebar}))},
    toggleHideLevel:()=>{set((state)=>({isHideLevels:!state.isSidebar}))},
    
    setFontSize:(size)=>{set(()=>({fontSize:size}))},
    setParagraphsPerPage:(n)=>{set(()=>({paragraphsPerPage:n}))},
    
}))
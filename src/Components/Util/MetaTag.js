import { useEffect } from "react";

const MetaTag = (title, description) =>{
    const defaultTitle = "Medborgerskabsprøve";
    const defaultDesc = "The best plateform for medborgerskabsprøve's preparation (concise and updated)";

    useEffect(() => {
        document.title = title || defaultTitle;
        document.querySelector("meta[name='description']").setAttribute("content", description || defaultDesc);
    }, [defaultTitle, title, defaultDesc, description]);
};

export default MetaTag
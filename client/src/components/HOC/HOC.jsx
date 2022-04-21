import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HOC = (ChildComponent) => {
  const ComposedComponent = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const id = localStorage.getItem("id")
      if(id === null){
          navigate('/')
      }
      
    }, [navigate]);

   
    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};

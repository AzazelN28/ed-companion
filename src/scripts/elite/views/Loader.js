import React, { Component } from "react";

/**
 * @see http://codepen.io/jpanter/pen/PWWQXK
 */
export class Loader extends Component {
   render() {
      return (
         <div className="Loader">
            <div className="Loader__row">
               <div className="Loader__arrow is--up is--outer is--outer-18"></div>
               <div className="Loader__arrow is--down is--outer is--outer-17"></div>
               <div className="Loader__arrow is--up is--outer is--outer-16"></div>
               <div className="Loader__arrow is--down is--outer is--outer-15"></div>
               <div className="Loader__arrow is--up is--outer is--outer-14"></div>
            </div>
            <div className="Loader__row">
               <div className="Loader__arrow is--up is--outer is--outer-1"></div>
               <div className="Loader__arrow is--down is--outer is--outer-2"></div>
               <div className="Loader__arrow is--up is--inner is--inner-6"></div>
               <div className="Loader__arrow is--down is--inner is--inner-5"></div>
               <div className="Loader__arrow is--up is--inner is--inner-4"></div>
               <div className="Loader__arrow is--down is--outer is--outer-13"></div>
               <div className="Loader__arrow is--up is--outer is--outer-12"></div>
            </div>
            <div className="Loader__row">
               <div className="Loader__arrow is--down is--outer is--outer-3"></div>
               <div className="Loader__arrow is--up is--outer is--outer-4"></div>
               <div className="Loader__arrow is--down is--inner is--inner-1"></div>
               <div className="Loader__arrow is--up is--inner is--inner-2"></div>
               <div className="Loader__arrow is--down is--inner is--inner-3"></div>
               <div className="Loader__arrow is--up is--outer is--outer-11"></div>
               <div className="Loader__arrow is--down is--outer is--outer-10"></div>
            </div>
            <div className="Loader__row">
               <div className="Loader__arrow is--down is--outer is--outer-5"></div>
               <div className="Loader__arrow is--up is--outer is--outer-6"></div>
               <div className="Loader__arrow is--down is--outer is--outer-7"></div>
               <div className="Loader__arrow is--up is--outer is--outer-8"></div>
               <div className="Loader__arrow is--down is--outer is--outer-9"></div>
            </div>
         </div>
      );
   }
}

export default Loader;

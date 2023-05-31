import {useRouteError} from "react-router-dom";
import React from "react";


export function ErrorPage() {
    const error = useRouteError();
    return (
        <div>
            <h1> Ohhh! An error occurred! </h1>
            <p>
                <i>Error message: {error.statusText || error.message}</i>
            </p>
        </div>
    )
}

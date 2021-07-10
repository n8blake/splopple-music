import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Playlist() {
    return (
        <div>
            <h1>Playlist</h1>
            <div class="card m-4 text-center">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src='https://static.billboard.com/files/media/denzel-curry-clout-cobain-2018-billboard-1548-compressed.jpg' class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Denzel Curry</h5>
                            <p class="card-text">Clout Cobain</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import './Playlist.scss';

export default function Playlist() {
    return (
        <div>
            <div class="m-2 input-group input-group-sm mb-3">
                <input type="text" class="rounded-pill border-secondary text-center form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder='input playlist url'/>
            </div>
            
            <div class="card h-50 d-inline-block">
                <ul class="list-group list-group-flush h-50 d-inline-block">
                    <li class="list-group-item row-md-2 d-flex flex-row"><div class='d-inline-flex flex-row text-center'><img src='https://static.billboard.com/files/media/denzel-curry-clout-cobain-2018-billboard-1548-compressed.jpg' class="img-fluid rounded-start w-25 m-2" alt="..."/><div class='d-flex flex-column text-center'><h5 class=" text-center d-flex card-title flex-column">Denzel Curry</h5><p class="text-center d-flex card-text flex-column">Clout Cobain</p></div></div></li>
                    <li class="list-group-item row-md-2 d-flex flex-row"><div class='d-inline-flex flex-row text-center'><img src='https://static.billboard.com/files/media/denzel-curry-clout-cobain-2018-billboard-1548-compressed.jpg' class="img-fluid rounded-start w-25 m-2" alt="..."/><div class='d-flex flex-column text-center'><h5 class=" text-center d-flex card-title flex-column">Denzel Curry</h5><p class="text-center d-flex card-text flex-column">Clout Cobain</p></div></div></li>
                    <li class="list-group-item row-md-2 d-flex flex-row"><div class='d-inline-flex flex-row text-center'><img src='https://static.billboard.com/files/media/denzel-curry-clout-cobain-2018-billboard-1548-compressed.jpg' class="img-fluid rounded-start w-25 m-2" alt="..."/><div class='d-flex flex-column text-center'><h5 class=" text-center d-flex card-title flex-column">Denzel Curry</h5><p class="text-center d-flex card-text flex-column">Clout Cobain</p></div></div></li>
                </ul>
            </div>
            <div class="m-2 input-group input-group-sm mb-3">
                <input type="text" class="rounded-pill border-secondary text-center form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder='generated playlist url'/>
                <FileCopyOutlinedIcon/>
            </div>
        </div>
    )
}

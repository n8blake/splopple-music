import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <div>
            <div class="m-2 input-group input-group-sm mb-3">
                <input type="text" class="rounded-pill border-secondary text-center form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder='playlist url'/>
            </div>
        </div>
    )
}

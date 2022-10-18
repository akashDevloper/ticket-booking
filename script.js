const container = document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const number=document.getElementById('ticket');
const tkt=document.getElementById('tkt');

populateUi();

let tktnumber=+tkt.value;

let ticketPrice= +number.value;


//set selected movies and the price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


//update and total the amount as selected seats price
function updateCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');

    const seatIndex=[...selectedSeats].map(function(seat){
        return[...seats].indexOf(seat);
    });
    
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedSeatCount=selectedSeats.length;

    tktconfirm=tktnumber*seats;
    
    amount.innerText=selectedSeatCount;
    total.innerText=selectedSeatCount*ticketPrice;
}

//get data from the localstorage and show in UI
function populateUi(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){
        number.selectedIndex=selectedMovieIndex;
    }
}

//seat booking more than one
tkt.addEventListener('change',(e)=>{
    tktnumber=+e.target.value;
       
})



//movie change events
number.addEventListener('change',(e)=>{
    ticketPrice= +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateCount();
});

container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }
    updateCount();
});
updateCount()
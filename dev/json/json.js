let a;
let b;
let c;
const delay = ms => new Promise(res => setTimeout(res, ms));

fetch('./prueba.json')
    .then((response) => response.json())
    .then((json) => {
        a = json;
        console.log(a);
    }
);
async function fetchData() {
    const response = await fetch('./prueba.json');
    const jsonData = await response.json();
    return jsonData;
}
    
b = await fetchData().then((data) => {
    //  console.log(data); 
    return data;
});

c = await fetchData();
console.log(b);
console.log(c);


for(let i=0;i<c.length;i++){
    console.log(i);
    document.getElementById('output_message').innerHTML = c[i].title;
    document.getElementById('output_message2').innerHTML = c[i].sentence;
    await delay(1000);
}

document.getElementById('output_message').innerHTML = c[0].title;
document.getElementById('output_message2').innerHTML = c[0].sentence;

const imageSelector = document.querySelector(".select");
const file = document.querySelector(".file");
const image = document.querySelector(".file-image img");
const inputW = document.querySelector(".width");
const inputH = document.querySelector(".height");
const button = document.querySelector("button");
const backIcon = document.querySelector(".back i");

// inicilized a varibles
let w,h;

function selectFile(e) {
    // function that show the uploaded image
    if(e.target.files && e.target.files[0]){
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event){
            image.src = event.target.result;
            w = image.naturalWidth;
            h = image.naturalHeight;
            // display width and height
            inputW.value = w;
            inputH.value = h;
        }
        // read the selected file 
        reader.readAsDataURL(selectedFile);
        document.querySelector(".file-image").classList.remove("hide");
        imageSelector.classList.add("none");
        
 
     
    }
}

function downloadImage(){
    if(w >0 && h >0) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = w;
        canvas.height = h;
        const img = new Image();
        img.src = image.src;

        img.onload = function(){
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "result";
            link.click();
            
        }
    }
}

function reset() {
    w = 0;
    h = 0;
    document.querySelector(".file-image").classList.add("hide");
    imageSelector.classList.remove("none");

}

imageSelector.addEventListener("click" , () =>{
    file.click();
})

file.addEventListener("change" , (e) => selectFile(e));

inputW.addEventListener("input" , (e) =>{
    w = e.target.value;
})
inputH.addEventListener("input" , (e) =>{
    h = e.target.value
})

button.addEventListener("click" , downloadImage);
backIcon.addEventListener("click" , reset);
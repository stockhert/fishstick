// used in login
import {type} from "node:os";
import data from 'src/Lessons.json' assert type( type: json) //uhguhghghhhhhhh

let toggled = false //used for toggler

function showByID(targetID: string, HTMLElementClass: string): void {
    document.querySelectorAll<HTMLElement>(HTMLElementClass).forEach(element => element.classList.remove("active"))
    document.getElementById(targetID)?.classList.add("active")
}

// landing page (home)
function typeOut(element:HTMLElement, delay:number = 100){

    let i: number = 0
    let text: string = element.textContent;
    element.textContent = ""

    function typeCharacter(){
        if(i < text.length){
            element.textContent += text[i];
            i++
            setTimeout(typeCharacter, delay)
        }
    }
    typeCharacter()
}

function aboutToggler(targetElement:string, HTMLElementClass:string, defaultClass:string, targetClass:string){
    toggled = !toggled
    if(toggled){

    }
}

// lessons
function showLesson(lessonTextContainer: string, htmlElementClass: string, lessonID: string): void {
}
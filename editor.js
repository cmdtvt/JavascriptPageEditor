//Javascript page text editor. by Topi-Veikko Tuusa

var gallery_images = [];
/*
url should have an list where elements are structured as is below. (api)
{"id":"2","filename":"example.jpg","location":"assets/example.jpg"}
*/
url = ""; 
fetch(url)
.then(res => res.json())
.then(out => {
    for (var i = 0; i < out.length; i++) {
        gallery_images.push("assets/uploads/"+out[i]['location'].replace("\n",""));
    }
})	
.catch(err => console.log(err));

function closeEditor(){
    document.getElementById("editor").style.display="none";
    document.getElementsByTagName('body')[0].style.overflow="scroll";

}

function selectImage(element,id) {
    document.getElementById("image").value = element.src;
    document.getElementById(id).src = element.src;
    document.getElementById("targetName").value = id;
    console.log(document.getElementById(id).src);
    console.log(element.src);
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Disable all pre exsisting links and buttons when in editing mode.
    var links = document.querySelectorAll("a,button");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            alert("Linkit estetty sivun muokkauksessa. Poistu muokkaustilasta painamalla Sivunhallinta navigaatio palkissa sivun ylälaidassa.");
            return false;
        };
    }
    document.querySelectorAll('form input[type="submit"]')
    .forEach(input => input.disabled = true);

    //Remove all links from navigation and add links back to the selection page.
    document.getElementById("navigation-items").innerHTML = `
        <a class="item" href="control/pagesettings">
            <p>Sivunhallinta</p>
        </a>
    `;

    //Cool orange borders to the page.
    document.getElementsByTagName("body")[0].classList.add("inedit");


    editorTextLayout = `
        <div class="col-md-12">
            <textarea id="editor-textarea" class="form-control" placeholder="Muuttettava teksti" rows=25 name="text"></textarea>
        </div>
        <div class="col-md-9"></div>
        <div class="col-md-3">
            <button class="btn btn-success btn-full" type="submit">Tallenna</button>
        </div>
    `;



    editorHtml = `
        <div class="container-fluid editor" id="editor">
            <div class="row">
                <form class="offset-md-7 col-md-5 editor-area" action="action" method="POST">
                    <input type="hidden" name="action" value="updateText" id="action"/>
                    <input type="hidden" name="targetName" id="targetName" value=""/>
                    <div class="row">
                        <div class="offset-md-10 col-md-2">
                            <button class="btn btn-info btn-full" onclick="closeEditor()" type="button">Sulje</button>
                        </div>
                    </div>
                    <div class="row" id="editor-layout">

                    </div>
                </form>
            </div>
        </div>
    `;

    //Add editor to the page and make it invisible.
    page = document.getElementsByTagName("body")[0].innerHTML
    document.getElementsByTagName("body")[0].innerHTML = editorHtml+page;
    document.getElementById("editor").style.display="none";



    function toggleEditorVisibility() {
        document.getElementsByTagName('body')[0].style.overflow="hidden";
        document.getElementById("editor").style.display="block";
    }

    function runEditor(element,text) {
        toggleEditorVisibility()
        document.getElementById("targetName").value = element.replace('edit-','');
        document.getElementById("action").value="updateText";
        document.getElementById("editor-layout").innerHTML = editorTextLayout;

        textarea = document.getElementById("editor-textarea");
        textarea.value = text;
    }

    var imagesLoaded = false;
    var editorImages = ""
    function runImageEditor(id) {
        toggleEditorVisibility()
        document.getElementById("action").value="updateImage";
        
        if (!imagesLoaded) {
            for (let i = 0; i < gallery_images.length; i++) {
                const element = gallery_images[i];
                editorImages += `
                    <div class="col-md-3">
                        <img src="${element}" class="img-fluid editImage mx-auto d-block" onclick="selectImage(this,'${id}');">
                    </div>
                `;
            }
            imagesLoaded = true;
        }

        document.getElementById("editor-layout").innerHTML = `
            <input type="hidden" name="image" value="" id="image"/>
            ${editorImages}
            <div class="col-md-9"></div>
            <div class="col-md-3">
                <button class="btn btn-success btn-full" type="submit">Tallenna</button>
            </div>
        `;

    }




    var text_ids = [];
    var image_ids = [];

    //Find all marked elements from page that can be edited.
    $("*").each(function() {
        if (this.id) {
            //Editable text
            if(this.id.startsWith("edit-")) {
                text_ids.push(this.id);
            }

            //Editable image
            if(this.id.startsWith("editImage-")) {
                image_ids.push(this.id);
            }
        }
    });

    for (let i = 0; i < text_ids.length; i++) {
        const element = text_ids[i];
        document.getElementById(element).addEventListener("click", function() {
            console.log("Clicked text: "+element);
            runEditor(element,this.textContent);
        });
    }

    for (let i = 0; i < image_ids.length; i++) {
        const element = image_ids[i];
        document.getElementById(element).addEventListener("click",function(){
            console.log("Cliked image: "+element);
            runImageEditor(element);
        });
        
    }
});


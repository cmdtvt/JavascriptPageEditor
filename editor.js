//Javascript page text editor. by Topi-Veikko Tuusa


function closeEditor(){
    document.getElementById("editor").style.display="none";
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


    

    editorHtml = `
        <div class="container-fluid editor" id="editor">
            <div class="row">
                <form class="offset-md-7 col-md-5 editor-area" action="action" method="POST">
                    <input type="hidden" name="action" value="updateText"/>
                    <input type="hidden" name="targetName" id="targetName" value=""/>
                    <div class="row">
                        <div class="offset-md-10 col-md-2">
                            <button class="btn btn-info btn-full" onclick="closeEditor()" type="button">Sulje</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <textarea id="editor-textarea" class="form-control" placeholder="Muuttettava teksti" rows=25 name="text"></textarea>
                        </div>

                        <div class="col-md-10">

                        </div>

                        <div class="col-md-2">
                            <button class="btn btn-success btn-full" type="submit">Tallenna</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

    //Add editor to the page and make it invisible.
    page = document.getElementsByTagName("body")[0].innerHTML
    document.getElementsByTagName("body")[0].innerHTML = editorHtml+page;
    document.getElementById("editor").style.display="none";



    function runEditor(element,text) {
        document.getElementById("editor").style.display="block";
        document.getElementById("targetName").value = element.replace('edit-','');;
        textarea = document.getElementById("editor-textarea");
        textarea.value = text;
    }


    var ids = [];
    $("*").each(function() {
        if (this.id) {
            if(this.id.startsWith("edit-")) {
                ids.push(this.id);
            }
        }
    });

    for (let i = 0; i < ids.length; i++) {
        const element = ids[i];
        document.getElementById(element).addEventListener("click", function() {
            console.log("Clicked: "+element);
            runEditor(element,this.textContent);
        });
    }
    console.log(ids);


});


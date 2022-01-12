# JavaScript website editor

Simple easily implementable JavaScript page editor. Mark which elements can be edited with id's. Include `editor.js` and `editor.css` to make elements editable.


## Setup

 - Include `editor.js` & `editor.css` on page when you want to edit it.
 - Give elements you want to be editable id starting with `edit-` by clicking open it in text edit mode.
 - Give image elements you want to be editable id starting with `editImage-` by clicking open it in image edit mode.
 - After `edit-` or `editImage-` should come string that identifies this place where the image is being edited. When saving this is sent along with edits. Example `edit-welcometext` 
 ### Image editor
 Image editor needs few extra steps to  work. Image editor needs list of images from API or JSON so it can show images that can be switched.
 
 - Set url variable in `editor.js` to a file or api which has images in list in following format.
 - `{"id":"2","filename":"example.jpg","location":"assets/example.jpg"}`

### Saving data
Editor has form that send POST request to file called action by default when clicking save.
What the POST request contains.
|Name|Value  |
|--|--|
|action| `updateText` or `updateImage` |
|targetName|id where `edit-` and `editImage-` are removed.|
|text|Has edited text|
|image|Has selected image|

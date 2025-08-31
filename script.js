const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert("Please enter both name and URL.");
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }

    addBookmark(name, url);
    saveBookmark(name, url);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
});

function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.addEventListener("click", function() {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);
    bookmarkList.appendChild(li);

}

function getBookmarksFromLocalStorage() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    return bookmarks ? bookmarks : [];
}

function saveBookmark(name, url) {
    const bookmarks = getBookmarksFromLocalStorage();
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromLocalStorage();

    bookmarks.forEach(bookmark => {
        addBookmark(bookmark.name, bookmark.url);
    });
}

function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarksFromLocalStorage();
    bookmarks = bookmarks.filter(b => !(b.name === name && b.url === url));
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

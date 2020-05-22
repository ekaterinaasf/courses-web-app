const renderFilesList = (filesArr) => {
  const filesList = filesArr
    .map((fileName) => {
      const loadButton = document.createElement("button");
      loadButton.innerHTML = fileName.name;
      loadButton.onclick = () => fetchAndLoadCourse(fileName);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.onclick = () => deleteFile(fileName);

      const li = document.createElement("li", fileName.name);
      li.appendChild(loadButton);
      li.appendChild(deleteButton);
      return li;
    })
    .reduce((all, next) => {
      all.appendChild(next);
      return all;
    }, document.createElement("ol"));

  const container = document.getElementById("list_container");
  container.innerHTML = "";
  // const list = document.createElement("ol");
  // list.appendChild(filesList);
  container.appendChild(filesList);
};

const fetchAndLoadCourse = (id) =>
  fetch("/api/courses/" + encodeURIComponent(id))
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((fileData) => loadFileToEditor(fileData.name, fileData.text))
    .catch((err) => console.error(err));

// const saveCourse = (fileName, fileText) => {
//   fetch("/api/files/" + encodeURIComponent(fileName), {
//     method: "POST",
//     body: JSON.stringify({ text: fileText }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw res;
//       }
//       return res.json();
//     })
//     .then((filesList) => {
//       renderFilesList(filesList);
//       alert("your changes are saved");
//     })
//     .catch((err) => {
//       alert("unable to save your changes");
//       console.error(err);
//     });
// };

const deleteFile = (id) => {
  fetch("/api/courses/" + encodeURIComponent(id), {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((filesList) => {
      renderFilesList(filesList);
      alert("file is deleted");
    })
    .catch((err) => {
      alert("unable to delete file");
      console.error(err);
    });
};

export const init = async () => {
  //const res = await fetch("/api");
  const res = await fetch("/api/courses");

  const data = await res.json();
  renderFilesList(data);
  console.log(data);

  document.getElementById("save-button").addEventListener("click", async () => {
    const res = await fetch("/courses", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("course_name").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    renderFilesList(data);
    console.log(data);
  });
};

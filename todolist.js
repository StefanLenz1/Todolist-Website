// setup after page loaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".submit_button").forEach(function (submit_button) {
    submit_button.disabled = true;
  });
  document.querySelectorAll("button").forEach(function (button) {
    button.disabled = true;
  });
  newTask();
  stateSubmitButton();
  document.querySelector("#remove_all_button").onclick = removeAll;
  removeTask();
  document.querySelector("#remove_newest_button").onclick = removeNewestTask;
  removeTasksContainingWord();
  document.querySelector("#remove_oldest_button").onclick = removeOldestTask;
});

function stateRemoveButton() {
  // check if there are list elements
  const list_elements = document.querySelectorAll("li");
  document.querySelectorAll("button").forEach(function (button) {
    button.disabled = list_elements.length === 0;
  });
}

function stateSubmitButton() {
  // state input submit button
  const input_field = document.querySelector("#input_field");
  input_field.onkeyup = function () {
    document.querySelector("#input_submit_button").disabled =
      input_field.value === "";
  };

  // state remove submit button
  const remove_field = document.querySelector("#remove_field");
  remove_field.onkeyup = function () {
    document.querySelector("#remove_submit_button").disabled =
      remove_field.value === "";
  };

  // state "remove tasks containing words" button
  const remove_oneword_field = document.querySelector("#remove_oneword_field");
  remove_oneword_field.onkeyup = function () {
    let state_disable =
      remove_oneword_field.value === "" ||
      remove_oneword_field.value.split(" ").length !== 1;
    document.querySelector("#remove_oneword_submit_button").disabled =
      state_disable;
  };
}

function newTask() {
  document.querySelector("#input_form").onsubmit = function () {
    // get text
    const input_field = document.querySelector("#input_field");
    const new_task = input_field.value;
    input_field.value = "";

    // check string empty
    if (new_task === "") {
      return false;
    }

    // create new list element
    let li = document.createElement("li");
    li.innerHTML = new_task;

    // add element to list
    document.querySelector("ul").append(li);
    document.querySelector("#input_submit_button").disabled = true;

    stateRemoveButton();
    return false;
  };
}

function removeTask() {
  document.querySelector("#remove_form").onsubmit = function () {
    // get text
    const remove_field = document.querySelector("#remove_field");
    const todelete_task = remove_field.value;

    remove_field.value = "";

    // remove list elements with the same content as requested
    document.querySelectorAll("li").forEach(function (list_element) {
      if (list_element.innerHTML.toLowerCase() === todelete_task.toLowerCase())
        list_element.remove();
    });

    document.querySelector("#remove_submit_button").disabled = true;
    stateRemoveButton();
    return false;
  };
}

function removeTasksContainingWord() {
  document.querySelector("#remove_oneword_form").onsubmit = function () {
    // get input
    const remove_oneword_field = document.querySelector(
      "#remove_oneword_field"
    );
    const todelete_word = remove_oneword_field.value;
    remove_oneword_field.value = "";

    // iterate through list elements
    tasks = document.querySelectorAll("li");
    for (let i = 0; i < tasks.length; i++) {
      // iterate through words
      words = tasks[i].innerHTML.split(" ");
      let flag_delete_task = false;
      for (j = 0; j < words.length; j++) {
        if (todelete_word.toLowerCase() === words[j].toLowerCase()) {
          flag_delete_task = true;
        }
      }
      // delete list element when flagges as deletable
      if (flag_delete_task) {
        tasks[i].remove();
      }
    }

    document.querySelector("#remove_oneword_submit_button").disabled = true;
    stateRemoveButton();
    return false;
  };
}

function removeAll() {
  document.querySelectorAll("li").forEach(function (list_element) {
    list_element.remove();
  });
  stateRemoveButton();
}

function removeNewestTask() {
  let list_elements = document.querySelectorAll("li");
  list_elements[list_elements.length - 1].remove();
  stateRemoveButton();
}

function removeOldestTask() {
  let list_elements = document.querySelectorAll("li");
  list_elements[0].remove();
  stateRemoveButton();
}

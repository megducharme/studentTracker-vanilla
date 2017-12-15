$(document).ready(function () {

    let students;
    
    $.ajax({
        type: "GET",
        url: "./c22.json"
    })
    .then(data => {
        students = data
        return students
    })
    .then(students => {
        students.forEach(currentStudent => {
            $.ajax({
                type: "GET",
                url: `http://localhost:6060/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,
                success: function (data) {
                    let lastCommit = data.find(event => {
                        return event.type === "PushEvent"
                    })
                    console.log(lastCommit)

                    let studentData = {}
                    studentData.student = currentStudent
    
                    let lastPush = new Date((lastCommit.created_at))
                    let today = new Date(Date.now())
                    studentData.diffDays = parseInt((today - lastPush) / (1000 * 60 * 60 * 24)) + " days ago"
    
                    studentData.repo = lastCommit.repo.name.split("/")[1]
                    studentData.message = lastCommit.payload.commits[0].message
    
                    studentData.color = "red"
    
                    if (studentData.diffDays === 0 + " days ago") {
                        studentData.diffDays = "today"
                        studentData.color = "green"
                    }
                    
                    printToDOM(studentData)
                }
            })
        })
    })

    function printToDOM(student){

        document.getElementById("output").innerHTML += `
        <div class="card center" style="width:335px; margin-left:38%; coloumn: 2;">
            <div class="card-body">
                <h4>${student.student.name}</h4>
                <p class="${student.color}">Last push was ${student.diffDays}</p>
                <p>${student.repo}</p>
                <p>"${student.message}"</p>
                <a href="https://github.com/${student.student.githubHandle}">Go to their repo</a>
            </div>
        </div>
        <hr>`
    }

})



// url: `https://student-github-tracker.heroku.com/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,

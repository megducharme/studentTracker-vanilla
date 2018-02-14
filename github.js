$(document).ready(function () {

    let students;
    let cohort;

    document.getElementById("classBtn").addEventListener("click", function(event){
        let jsonAddress = event.target.id
        document.getElementById("output").innerHTML = ""
        cohort = `./${jsonAddress}.json`
        getStudentData()
    })
    
    function getStudentData(){
        $.ajax({
            type: "GET",
            url: cohort
        })
        .then(data => {
            students = data
            return students
        })
        .then(students => {
            students.forEach(currentStudent => {
                $.ajax({
                    type: "GET",
                    url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,
                    success: function (data) {
                        
                        let pushEvent = data.find(event => {
                            return event.type === "PushEvent" 
                        })
                        
                        let lastCommit = pushEvent.payload.commits.find(commit => {
                            return commit.distinct == true
                        })

                        let studentData = {}
                        studentData.student = currentStudent
        
                        let lastPush = new Date(pushEvent.created_at)
                        let today = new Date(Date.now())
                        studentData.diffDays = parseInt((today - lastPush) / (1000 * 60 * 60 * 24)) + " days ago"
        
                        studentData.repo = pushEvent.repo.name.split("/")[1]
                        studentData.message = lastCommit.message
        
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
    }

    function printToDOM(student){

        document.getElementById("output").innerHTML += `
        <div class="card center" style="width:335px; margin-left:38%; coloumn: 2;">
            <div class="card-body">
                <h4>${student.student.name}</h4>
                <p class="${student.color}">Last push was ${student.diffDays}</p>
                <p>${student.repo}</p>
                <p>"${student.message}"</p>
                <a href="https://github.com/${student.student.githubHandle}/${student.repo}">Go to their repo</a>
            </div>
        </div>`
    }

})



// url: `https://student-github-tracker.heroku.com/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,

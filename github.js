$(document).ready(function () {

    $(".loader-gif2").hide()
    $(".loader-gif").show()

    document.getElementById("classBtn").addEventListener("click", function (event) {
        let jsonAddress = event.target.id
        document.getElementById("output").innerHTML = ""
        let cohort = `./${jsonAddress}.json`
        getStudentData(cohort)
    })

    function getStudentData(cohort) {
        $(".loader-gif").hide()
        $(".loader-gif2").show()

        $.ajax({
                type: "GET",
                url: cohort
            })
            .then(data => {
                let students = data
                return students
            })
            .then(students => {
                let counter = 0;
                const arrayOfPromises = []
                let allStudents = []
                let stringToDOM = ""

                //create promise for each ajax call to get student's latest github events
                students.forEach(student => {
                    arrayOfPromises.push(
                        $.ajax({
                            type: "GET",
                            url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/events`
                        })
                    )
                })

                //get all data and then parse it and build up studentData objects
                Promise.all(arrayOfPromises).then(responses => {
                    responses.forEach(data => {
                        let event = ""

                        let pushEvent = data.find(event => {
                            return event.type === "PushEvent"
                        })

                        let studentName = students.find(student => {
                            return student.githubHandle === data[0].actor.login
                        })

                        let lastPush = new Date(pushEvent.created_at)
                        let today = new Date(Date.now())

                        let studentData = {
                            name: studentName.name,
                            githubHandle: pushEvent.actor.login,
                            repo: pushEvent.repo.name.split("/")[1],
                            message: pushEvent.payload.commits[pushEvent.payload.commits.length - 1].message,
                            repoURL: pushEvent.repo.url.split("repos/")[1],
                            diffDays: parseInt((today - lastPush) / (1000 * 60 * 60 * 24)) + " days ago",
                            event: event
                        }

                        switch(studentData.diffDays){
                            case 0 + " days ago":
                                studentData.diffDays = "today"
                                studentData.color = "green"
                                break;
                            case 1 + " days ago":
                                studentData.diffDays = "yesterday"
                                studentData.color = "green"
                                break;
                            case 2 + " days ago":
                            case 3 + " days ago":
                                studentData.color = "orange"
                                break;
                            default:
                                studentData.color = "red"
                                break;
                        }


                        if(data[0].type === "ForkEvent"){
                            studentData.event = "fork"
                            studentData.repo = data[0].repo.name.split("/")[1]
                        }

                        allStudents.push(studentData)
                    })

                    //hide the loading dude before printing student cards to the page
                    $(".loader-gif2").hide()

                    //loop over studentData objects and print them to the page in a boostrap grid - the row divs clearly caused me issues
                    allStudents.forEach(student => {
                        if (counter === 0) {
                            stringToDOM += `<div class="row">`
                        }

                        if (counter % 4 === 0) {
                            stringToDOM += `</div>`
                            stringToDOM += `<div class="row">`
                        }

                        counter++
                        printToDOM(student, stringToDOM)
                    })
                })

            })
    }


    function printToDOM(student, stringToDOM) {
        stringToDOM += `
            <div class="card center col">
            <div class="card-body">
            <h4>${student.name}</h4>`

        if(student.event === "fork"){
            stringToDOM += 
            `<p class="${student.color}">Forked a repo ${student.diffDays}</p>
            <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}`

        } else {
            stringToDOM +=
            `<p class="${student.color}">Pushed to GitHub ${student.diffDays}</p>
            <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}`
        }

        stringToDOM += 
            `</p></a>
            <p>"${student.message}"</p>
            <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
            </div>
            </div>`


        document.getElementById("output").innerHTML = stringToDOM
    }

})

// url: `https://student-github-tracker.heroku.com/student/commit/https://api.github.com/users/${currentStudent.githubHandle}/events`,
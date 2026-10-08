// Leave balance

let leaveBalance = {

    "Casual Leave": 12,

    "Medical Leave": 15,

    "Earned Leave": 20

};


// Get HTML elements

const startDate =
    document.getElementById("startDate");

const endDate =
    document.getElementById("endDate");

const numberOfDays =
    document.getElementById("numberOfDays");


// Calculate leave days

function calculateDays() {

    if (
        startDate.value === "" ||
        endDate.value === ""
    ) {

        numberOfDays.innerText = "0";

        return;
    }


    const start =
        new Date(startDate.value);

    const end =
        new Date(endDate.value);


    if (end < start) {

        numberOfDays.innerText = "0";

        return;
    }


    const difference =
        end.getTime() -
        start.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    numberOfDays.innerText = days;

}


// Calculate whenever dates change

startDate.addEventListener(
    "change",
    calculateDays
);

endDate.addEventListener(
    "change",
    calculateDays
);


// Update leave balance

function updateBalance() {

    document.getElementById(
        "casualDays"
    ).innerText =
        leaveBalance["Casual Leave"];


    document.getElementById(
        "medicalDays"
    ).innerText =
        leaveBalance["Medical Leave"];


    document.getElementById(
        "earnedDays"
    ).innerText =
        leaveBalance["Earned Leave"];

}


// Form submission

document
    .getElementById("leaveForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Get employee information

            const employeeName =
                document.getElementById(
                    "employeeName"
                ).value.trim();


            const employeeId =
                document.getElementById(
                    "employeeId"
                ).value.trim();


            const leaveType =
                document.getElementById(
                    "leaveType"
                ).value;


            const start =
                document.getElementById(
                    "startDate"
                ).value;


            const end =
                document.getElementById(
                    "endDate"
                ).value;


            const reason =
                document.getElementById(
                    "reason"
                ).value.trim();


            const days =
                parseInt(
                    numberOfDays.innerText
                );


            // Validate employee

            if (
                employeeName === "" ||
                employeeId === ""
            ) {

                alert(
                    "Please enter employee details."
                );

                return;
            }


            // Validate dates

            if (days <= 0) {

                alert(
                    "Please select valid dates."
                );

                return;
            }


            // Check available leave

            if (
                days >
                leaveBalance[leaveType]
            ) {

                alert(
                    "Insufficient " +
                    leaveType +
                    ". Available days: " +
                    leaveBalance[leaveType]
                );

                return;
            }


            // Reduce balance

            leaveBalance[leaveType] -= days;


            updateBalance();


            // Add row to table

            const table =
                document.getElementById(
                    "leaveTable"
                );


            const row =
                table.insertRow();


            row.insertCell(0)
                .innerText =
                employeeName;


            row.insertCell(1)
                .innerText =
                leaveType;


            row.insertCell(2)
                .innerText =
                start;


            row.insertCell(3)
                .innerText =
                end;


            row.insertCell(4)
                .innerText =
                days;


            row.insertCell(5)
                .innerText =
                reason;


            const statusCell =
                row.insertCell(6);


            statusCell.innerHTML =
                `<span class="status pending">
                    Pending
                </span>`;


            // Success message

            alert(
                "Leave application submitted successfully!"
            );


            // Reset form

            document
                .getElementById("leaveForm")
                .reset();


            numberOfDays.innerText =
                "0";

        }
    );


// Initial balance

updateBalance();
// Load saved data

let members = JSON.parse(
    localStorage.getItem("zasMembers")
) || [];

let fees = JSON.parse(
    localStorage.getItem("zasFees")
) || [];


// Dashboard

function updateDashboard() {

    document.getElementById("totalMembers").textContent =
        members.length;

    document.getElementById("totalFees").textContent =
        fees.length;

}


// Register Member

document.getElementById("memberForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const member = {

        id: Date.now(),

        name: document.getElementById("memberName").value,

        age: document.getElementById("memberAge").value,

        gender: document.getElementById("memberGender").value,

        phone: document.getElementById("memberPhone").value,

        plan: document.getElementById("memberPlan").value

    };

    members.push(member);

    localStorage.setItem(
        "zasMembers",
        JSON.stringify(members)
    );

    displayMembers();

    updateDashboard();

    this.reset();

    alert("Member Registered Successfully!");

});


// Display Members

function displayMembers(data = members) {

    const memberList =
        document.getElementById("memberList");

    memberList.innerHTML = "";

    data.forEach(member => {

        const row = document.createElement("tr");

        [
            member.id,
            member.name,
            member.age,
            member.gender,
            member.phone,
            member.plan
        ].forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        const actionCell = document.createElement("td");

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {

            deleteMember(member.id);

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        memberList.appendChild(row);

    });

}


// Delete Member

function deleteMember(id) {

    if (confirm("Are you sure you want to delete this member?")) {

        members = members.filter(
            member => member.id !== id
        );

        localStorage.setItem(
            "zasMembers",
            JSON.stringify(members)
        );

        displayMembers();

        updateDashboard();

        alert("Member Deleted Successfully!");

    }

}


// Search Members

document.getElementById("searchMember")
.addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const filteredMembers = members.filter(member =>

        member.name.toLowerCase().includes(searchValue) ||

        member.plan.toLowerCase().includes(searchValue)

    );

    displayMembers(filteredMembers);

});


// Submit Monthly Fee

document.getElementById("feeForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const fee = {

        name: document.getElementById("feeMember").value,

        amount: document.getElementById("feeAmount").value,

        date: document.getElementById("feeDate").value

    };

    fees.push(fee);

    localStorage.setItem(
        "zasFees",
        JSON.stringify(fees)
    );

    displayFees();

    updateDashboard();

    this.reset();

    alert("Fee Record Added Successfully!");

});


// Display Fee Records

function displayFees() {

    const feeList =
        document.getElementById("feeList");

    feeList.innerHTML = "";

    fees.forEach(fee => {

        const row = document.createElement("tr");

        [fee.name, "Rs. " + fee.amount, fee.date]
        .forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        feeList.appendChild(row);

    });

}


// Initial Loading

displayMembers();

displayFees();

updateDashboard();
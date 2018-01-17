/***
 *
 */
let user = new Vue({
    el:"#user",
    data: {
        uid: "",
        uname : "",
        pwd : "",
        inputid : ""
    },
    methods:{
        getSinglefun: function(){
            axios.get('http://localhost:8080/getUserById', {
                params: {
                    receiveid: user.inputid
                }
            })
                .then(function (response) {
                    alert(response);
                    user.$data.uid = response.data.id;
                    user.$data.uname = response.data.name;
                    user.$data.pwd = response.data.password;
                })
        }
    }
});

let adduser = new Vue({
    el:"#adduser",
    data: {
        addname : "",
        addpassword : ""
    },
    methods:{
        addUserfun: function(){
            axios.post('http://localhost:8080/addUser', {

                    name : adduser.addname,
                    password : adduser.addpassword

            })
                .then(function (response) {
                    getAll.getAllfun();                 //调用不同对象内的方法
                    alert("Success!!");
                })
        }
    }
});

let getAll = new Vue({
    el:"#getall",
    data: {
        users:{},
        updateid : "",
        updatepassword : "",
        max : "",
        min : "",
        visible : false
    },
    methods:{
        getAllfun: function () {
            axios.get('http://localhost:8080/getUser').then(function(response){
                getAll.users = response.data;
            })
        },
        getByNumber: function(){
            axios.get('http://localhost:8080/getByNumber', {
                params: {
                    min : this.min,
                    max : this.max
                }
            }).then(function (response) {
                getAll.users = response.data;
            })
        },
        deletethis: function (p1) {
            alert("delete:ID="+p1)
            axios.get('http://localhost:8080/deleteUser', {
                params: {
                    id : p1
                }
            }).then(function (response) {
                getAll.getAllfun();
            })
        },
        updatethis: function (p1,p2) {
            getAll.$data.visible = true;
            this.updateid = p1;
            this.updatepassword = p2;
            console.log(this.updatepassword);
        },
        updatenow: function () {
            axios.post('http://localhost:8080/updateUser', {

                    id : this.updateid,
                    password : this.updatepassword

            }).then(function (response) {
                getAll.getAllfun();                 //调用同对象内方法
                getAll.$data.visible = false;
            })
        }
    }
});

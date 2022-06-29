<template>
  <NavLayout>
    <!-- add user -->
    <Modal
      @close="toggleAddUserModal"
      @submitModal="addUser"
      :modalActive="addModalToggle"
      :isInvalid="addModalValidate"
      header="User Profile"
    >
      <form
        class="needs-validate"
        :class="{
          '': !addModalValidate,
          'was-validate': addModalValidate,
        }"
        :novalidate="true"
      >
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="usernameDes"
            v-model.trim="username"
          />
          <div id="usernameDes" class="form-text">Username must be unique!</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model.trim="password"
          />
        </div>
        <div class="mb-3">
          <label for="firstname" class="form-label">Firstname</label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            v-model.trim="firstname"
          />
        </div>
        <div class="mb-3">
          <label for="lastname" class="form-label">Lastname</label>
          <input
            type="text"
            class="form-control"
            id="lastname"
            v-model.trim="lastname"
          />
        </div>
        <div class="text-danger" v-show="addModalValidate">
          Please select framework
        </div>
      </form>
    </Modal>
    <!-- edit user -->
    <Modal
      @close="toggleEditUserModal"
      @submitModal="editUser"
      :modalActive="editModalToggle"
      :isInvalid="editModalValidate"
      header="Edit User Profile"
    >
      <form
        class="needs-validate"
        :class="{
          '': !editModalValidate,
          'was-validate': editModalValidate,
        }"
        :novalidate="true"
      >
        <div class="mb-3">
          <label for="editUsername" class="form-label">Username</label>
          <input
            type="text"
            class="form-control text-muted"
            id="editUsername"
            aria-describedby="editUsernameDes"
            v-model.trim="editUsername"
            disabled
            readonly
          />
          <div id="editUsernameDes" class="form-text">Username must be unique!</div>
        </div>
        <div class="mb-3">
          <label for="editFirstname" class="form-label">Firstname</label>
          <input
            type="text"
            class="form-control"
            id="editFirstname"
            v-model.trim="editFirstname"
          />
        </div>
        <div class="mb-3">
          <label for="editLastname" class="form-label">Lastname</label>
          <input
            type="text"
            class="form-control"
            id="editLastname"
            v-model.trim="editLastname"
          />
        </div>
        <div class="text-danger" v-show="editModalValidate">
          Please select framework
        </div>
      </form>
    </Modal>

    <div class="bg-white rounded-3 shadow wrapper p-3">
      <h3 class="p-3 font-medium">REST API</h3>

      <section class="d-flex justify-content-center">
        <div class="card timer-box p-3 row me-3">
           <h6 class="font-medium d-flex justify-content-center">EXECUTE TIME</h6>
          <div
            class="col card timer-number text-muted fs-2 font-medium justify-content-center align-items-center"
          >
            {{ executeTime }} s
          </div>
        </div>
      </section>

      <section class="d-flex justify-content-center mt-3 mb-3">
        <label class="fs-6 font-medium align-self-center me-3"
          >Framework:</label
        >
        <div
          class="position-relative align-self-center framework-dropdown shadown me-3"
        >
          <drop-down-v2-vue
            @returnSelectItem="getItemDropdown"
            componentId="searchDropdown"
            :insertedItem="frameworkList"
          ></drop-down-v2-vue>
        </div>
        <button
          @click="openAddUserModal()"
          class="btn btn-primary search-button align-self-center me-3"
        >
          ADD USER
        </button>
        <button
          @click="getUser()"
          class="btn btn-secondary search-button align-self-center"
        >
          GET USER
        </button>
      </section>

      <!-- table -->
      <section class="p-4 table-section border rounded-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userList">
              <td class="fs-5" scope="row">{{ item.username }}</td>
              <td class="fs-5">{{ item.firstname }}</td>
              <td class="fs-5">{{ item.lastname }}</td>
              <td
                @click="
                  openEditUserModal(
                    item.username,
                    item.firstname,
                    item.lastname
                  )
                "
                class="text-warning fs-4"
              >
                <i class="bi bi-pencil-square"></i>
              </td>
              <td @click="deleteUser(item.username)" class="text-danger fs-4"><i class="bi bi-trash"></i></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </NavLayout>
</template>
<script lang="ts">
// @ts-ignore since it all javascript in this component
import Modal from "@/components/Modal.vue";
// @ts-ignore since it all javascript in this component
import DropDownV2Vue from "@/components/DropDownV2.vue";
import NavLayout from "@/components/NavLayout.vue";
import { ref, reactive } from "@vue/reactivity";
import axios from "axios";

type user = {
  username: string;
  firstname: string;
  lastname: string;
};

export default {
  components: {
    Modal,
    NavLayout,
    DropDownV2Vue,
  },
  setup() {
    const userList = ref<user[]>([]);
    const frameworkList = ref<string[]>([ "Express js", "Gin", ".Net6"]);
    const executeTime = ref<number>(0);
    let port: string = "9000";
    const getItemDropdown = (item: string) => {
      switch (item) {
        case "None":
          port = "";
          break;
        case "Express js":
          port = "9000";
          break;
        case "Gin":
          port = "5000";
          break;
        case ".Net6":
          port = "5180";
          break;
        default:
          port = "";
          break;
      }
    };
    // every modal data
    const username = ref<string>("");
    const password = ref<string>("");
    const firstname = ref<string>("");
    const lastname = ref<string>("");

    // create user modal
    const addModalToggle = ref<Boolean>(false);
    const addModalValidate = ref<Boolean>(false);

    const toggleAddUserModal = () => {
      addModalToggle.value = !addModalToggle.value;
      addModalValidate.value = false;
      username.value = "";
      password.value = "";
      firstname.value = "";
      lastname.value = "";
    };
    const openAddUserModal = () => {
      addModalToggle.value = !addModalToggle.value;
      addModalValidate.value = false;
      username.value = "";
      password.value = "";
      firstname.value = "";
      lastname.value = "";
    };

    const addUser = () => {
      if (port !== "") {
        const body: {
          username: string;
          password: string;
          firstname: string;
          lastname: string;
        } = {
          username: username.value,
          password: password.value,
          firstname: firstname.value,
          lastname: lastname.value,
        };
        axios
          .post(`http://localhost:${port}/create`, body)
          .then((res) => {
            addModalToggle.value = !addModalToggle.value;
            executeTime.value = res.data.executeTime;
            addModalValidate.value = false;
            axios
              .get(`http://localhost:${port}/getUser`)
              .then((res) => {
                userList.value = res.data.records;
              })
              .catch((err) => {
                console.log(err);
              });
            username.value = "";
            password.value = "";
            firstname.value = "";
            lastname.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        addModalValidate.value = true;
      }
    };

    //edit modal
    const editModalToggle = ref<Boolean>(false);
    const editModalValidate = ref<Boolean>(false);
    const editUsername = ref<string>("");
    const editFirstname = ref<string>("");
    const editLastname = ref<string>("");

    const toggleEditUserModal = () => {
      editModalToggle.value = !editModalToggle.value;
      editModalValidate.value = false;
      editUsername.value = "";
      editFirstname.value = "";
      editLastname.value = "";
    };
    const openEditUserModal = (
      username: string,
      firstname: string,
      lastname: string
    ) => {
      editModalToggle.value = !editModalToggle.value;
      editModalValidate.value = false;
      editUsername.value = username;
      editFirstname.value = firstname;
      editLastname.value = lastname;
    };
    const editUser = (
      username: string,
      firstname: string,
      lastname: string
    ) => {
      if (port !== "") {
        const body: {
          username: string;
          firstname: string;
          lastname: string;
        } = {
          username: editUsername.value,
          firstname: editFirstname.value,
          lastname: editLastname.value,
        };
        axios
          .put(`http://localhost:${port}/editUser`, body)
          .then((res) => {
            editModalToggle.value = !editModalToggle.value;
            executeTime.value = res.data.executeTime;
            editModalValidate.value = false;
            editUsername.value = "";
            editFirstname.value = "";
            editLastname.value = "";
            axios
              .get(`http://localhost:${port}/getUser`)
              .then((res) => {
                userList.value = res.data.records;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        editModalValidate.value = true;
      }
    };

    const getUser = () => {
      userList.value = [];
      executeTime.value = 0;
      if (port !== "") {
        axios
          .get(`http://localhost:${port}/getUser`)
          .then((res) => {
            executeTime.value = res.data.executeTime;
            userList.value = res.data.records;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please select framework");
      }
    };

    const deleteUser = (username: string) => {
      executeTime.value = 0;
      if (port !== "")  {
        axios
          .delete(`http://localhost:${port}/deleteUser/${username}`)
          .then((res) => {
            executeTime.value = res.data.executeTime;
            axios
              .get(`http://localhost:${port}/getUser`)
              .then((res) => {
                userList.value = res.data.records;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please select framework");
      }

      
    };

    return {
      getItemDropdown,
      editModalToggle,
      addModalToggle,
      frameworkList,
      executeTime,
      userList,
      username,
      password,
      firstname,
      lastname,
      getUser,
      toggleAddUserModal,
      addUser,
      openAddUserModal,
      addModalValidate,
      editUsername,
      editFirstname,
      editLastname,
      editModalValidate,
      toggleEditUserModal,
      openEditUserModal,
      editUser,
      deleteUser
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 900px;
  max-height: 900px;
}

.timer-box {
  width: 50%;
  height: 120px;
  .timer-number {
    width: 100%;
    height: 90%;
  }
}

button {
  height: 40px;
  width: 200px;
}

.framework-dropdown {
  width: 200px;
  height: 40px;
}

.table-section {
  height: 600px;
  overflow-y: scroll;
}
</style>

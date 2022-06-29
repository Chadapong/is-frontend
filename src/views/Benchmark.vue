<template>
  <navbar-layout-vue>
    <main class="bg-white rounded-3 shadow wrapper p-3">
      <h3 class="p-3 font-medium">BENCHMARK</h3>
      <!-- show execute time -->
          
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
          class="position-relative align-self-center search-dropdown shadown me-3"
        >
          <drop-down-v2-vue
            @returnSelectItem="getFramework"
            componentId="searchDropdown"
            :insertedItem="frameworkList"
          ></drop-down-v2-vue>
        </div>
        <label class="fs-6 font-medium align-self-center me-3">API:</label>
        <div
          class="position-relative align-self-center search-dropdown shadown me-3"
        >
          <drop-down-v2-vue
            @returnSelectItem="getDropDownItem"
            componentId="searchDropdown"
            :insertedItem="seacrhList"
          ></drop-down-v2-vue>
        </div>
        <label></label>
        <button
          @click="selectButton()"
          class="btn btn-primary search-button align-self-center"
        >
          SEARCH
        </button>
      </section>

      <!-- display items -->
      <section>
        <div class="card display-box p-4">
          <!-- item -->
          <div v-for="row in formatRow" class="row mb-3">
            <div v-for="item in row" class="card col shadow-sm card-item me-3">
              <div class="card-body d-flex align-items-center">
                <label class="fs-5 font-medium">INDEX:</label>
                <span class="me-3 fs-5"> {{ item.index }} </span>
                <label class="fs-5 font-medium">ID:</label>
                <span class="me-3 fs-5"> {{ item.id }} </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </navbar-layout-vue>
</template>

<script lang="ts">
import { reactive, ref, computed } from "@vue/reactivity";
// @ts-ignore since it all javascript in this component
import DropDownV2Vue from "@/components/DropDownV2.vue";
import NavbarLayoutVue from "@/components/NavLayout.vue";
import axios from "axios";

type healthCare = {
  index: bigint;
  id: Text;
  heartDisease: boolean;
  bmi: number;
  smoking: boolean;
  alcoholdrinking: boolean;
  stroke: boolean;
  physicalHealth: number;
  mentalHealth: number;
  diffWalking: boolean;
  sex: Text;
  ageCategory: Text;
  race: Text;
  diabetic: Text;
  physicalActivity: boolean;
  genHealth: Text;
  sleepTime: number;
  asthma: boolean;
  kidneyDisease: boolean;
  skinCancer: boolean;
};

type user = {
  name: string;
};

export default {
  components: {
    NavbarLayoutVue,
    DropDownV2Vue,
  },

  setup() {
    const seacrhList = ref<string[]>([ "Very Complex", "Complex"]);
    const frameworkList = ref<string[]>(["Express js", "Gin", ".Net6"]);
    const itemList = ref<healthCare[]>([]);
    const executeTime = ref<number>(0);
    let selectedItem: string = "Very Complex";
    let port: string = "9000";
    const getDropDownItem = (item: string) => {
      selectedItem = item;
    };

    const getFramework = (item: string) => {
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

    const selectButton =  () => {
      console.log(selectedItem);
      executeTime.value = 0;
      itemList.value = [];
      if ( (port !== "") &&(selectedItem !=="None") ) {
        if (selectedItem === "Complex") {
           axios
            .get(`http://localhost:${port}/complex-query`)
            .then((res) => {
              executeTime.value = res.data.executeTime;
              itemList.value = res.data.records;
            })
            .catch((err) => {
              console.log(err);
            });
        }

        if (selectedItem === "Very Complex") {
           axios
            .get(`http://localhost:${port}/very-complex-query`)
            .then((res) => {
              executeTime.value = res.data.executeTime;
              itemList.value = res.data.records;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }else{
        alert("Please select framework and query")
      }
    };

    const formatRow = computed(() => {
      let tempList: Array<healthCare[]> = [];
      console.log(itemList.value.length);
      if (itemList.value.length > 0) {
        const size: number = 2;
        Array.from(
          { length: Math.ceil(itemList.value.length / size) },
          (val, i) => {
            tempList.push(itemList.value.slice(i * size, i * size + size));
          }
        );
      }
      return tempList;
    });

    return {
      seacrhList,
      getDropDownItem,
      itemList,
      formatRow,
      selectButton,
      executeTime,
      frameworkList,
      getFramework
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

.search-dropdown {
  width: 200px;
}
.search-button {
  width: 200px;
  height: 38.156px;
}
.display-box {
  height: 600px;
  overflow-y: scroll;
  .card-item {
    height: 100px;
    max-width: 698px;
  }
}
</style>

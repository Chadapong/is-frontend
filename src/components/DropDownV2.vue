<template>
  <div>
    <div class="wrapper">
      <button
        @click="toggleDropDown"
        id="componentId"
        type="button"
        class="
          rounded-3
          d-flex
        
          align-items-center
          d-flex
          justify-content-between
          ps-3
          dropdown-invalid
        "
        :class="{
          'validate-dropdown': isInvalid,
          '': !isInvalid,
        }"
      >
        <div :class="showTextClass">{{ showItem }}</div>
        <span class="px-3"
          ><i
            class=""
            :class="{
              'bi bi-chevron-down': !showItemBtn,
              'bi bi-chevron-up': showItemBtn,
            }"
          ></i
        ></span>
      </button>

      <transition name="menu">
        <div v-show="showItemBtn" class="bg-white listItem rounded-3 pt-2 p-2 ">
          <ul>
            <li
              @click="[getItem(item),toggleDropDown()]"
              v-for="item in insertedItem"
              :key="item"
              class="font-medium p-2"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "@vue/reactivity";

const props = defineProps({
  componentId: String,
  insertedItem: {
    type: Array,
    require: true,
  },
  resetDropDown:{
    type:Boolean,
    default:false
  },
  needValidate: {
    type: Boolean,
    default: false,
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
});
const showItemBtn=ref(false);
const emits = defineEmits([ "returnSelectItem"]);
const showItem = ref("");
showItem.value=props.insertedItem[0];
const showTextClass = computed(() => {
  if (props.insertedItem === []) {
    return "text-muted";
  } else {
    return (props.insertedItem === props.insertedItem.includes(props.showItem)
      ? "text-black"
      : "text-muted");
  }
});


// btn
// const showItemBtn = ref(false);

 function toggleDropDown() {
   if (props.resetDropDown){
     showItemBtn.value =false;
   }else{
     showItemBtn.value = !showItemBtn.value;
   }
 
}

async function getItem(item) {
    showItem.value = item;
  emits("returnSelectItem", item);
}

// set dropdown
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

button {
  background: none;
  width: 100%;
  height: 100%;
  min-height: 42.17px;
  border: 1px solid #ced4da;
  overflow: auto;
}

button:focus-visible{
  border-color: #80bdff;
  box-shadow:0 0 0 0.2rem rgb(0 123 255 / 25%);
  outline: 0 ;
}.listItem {
  z-index: 1;
  position: absolute;
  border: 1px solid #ced4da;
  border-top: none;
  width: inherit;
  overflow-y: scroll;
  max-height: 150px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
}

li:hover {
  background: grey;
  color: white;
  border-radius: 0.3rem;
}

.validate-dropdown.dropdown-invalid {
  border-color: #dc3545;
}

// transition
</style>
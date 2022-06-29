<template>
  <div class="wrapper d-flex">
    <nav class="sidebar shadow">
      <div class="px-3">
        <h6 class="siderbar-main-header px-3 mt-4 mb-4 sidebar-item">Menu</h6>
        <div v-for="header in sidebarItemList" :key="header.title" class="mb-2">
          <h5
            class="
              sidebar-heading
              px-4
              d-flex
              justify-content-between
              font-medium
              nav-link
            "
            @click="
              [
                (header.showList = !header.showList),
                changePage(header.link, header),
              ]
            "
          >
            <div>
              <i :class="header.icon"></i>
              {{ header.title }}
            </div>
            <i
              :class="
                header.showList ? 'bi bi-chevron-up' : 'bi bi-chevron-down'
              "
              v-if="header.moreList"
            ></i>
          </h5>
          <ul
            class="nav flex-column px-4"
            v-if="header.moreList && header.showList"
          >
            <li
              class="fs-5 temp font-medium fs-6"
              v-for="item in header.subItem"
              :key="item"
              @click="changePage(item.link, header)"
            >
              <div class="nav-link sidebar-sub-item font-medium">
                {{ item.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- show page -->
    <div class="content px-4 pt-4 pb-3">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import router from "@/router";
type sidebarItem = {
  title: string;
  link: string;
  icon: string;
  moreList: boolean;
  showList: boolean;
  subItem: { title: string; link: string; icon: string }[];
};
export default {
  setup() {
    const sidebarItemList: sidebarItem[] = reactive([
      {
        title: "Benchmark",
        link: "",
        icon: "bi bi-search",
        moreList: false,
        showList: false,
        subItem: [],
      },
      {
        title: "restful API",
        link: "rest-api",
        icon: "bi bi-table",
        moreList: false,
        showList: false,
        subItem: [],
      },
    ]);

    const changePage = (title: string, headerObj: sidebarItem) => {
      if (headerObj.subItem.length == 0) {
        router.replace("/" + title);
      } else {
        if (title != headerObj.link) {
          router.replace("/" + headerObj.link + "/" + title);
        }
      }
    };

    return {
      sidebarItemList,
      changePage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";
.wrapper {
  width: 100vh;
  height: 100vh;
}
.content {
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
}

//sidebar
/* sidebar */
.sidebar {
  min-width: 300px;
  max-width: 300px;
  height: 100vh;
  background: $color-main-custom-primary;
  // font-size: 0.78rem;
}

.siderbar-main-header {
  text-transform: uppercase;
  color: white;
  cursor: default;
}
.sidebar-heading {
  text-transform: uppercase;
  color: white;
  cursor: pointer;
}

.sidebar-heading:active {
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  // border: 2px solid black;
  border-radius: 0.3rem;
  background: #eceff2;
  padding-bottom: 10px;
  padding-top: 10px;
}

.sidebar-heading:hover {
  color: black;
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  // border: 2px solid black;
  border-radius: 0.3rem;
  background: #eceff2;
}

.sidebar-sub-item {
  color: white;
  cursor: pointer;
}

.sidebar-sub-item:hover {
  color: black;
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  // border: 2px solid black;
  border-radius: 0.3rem;
  background: #eceff2;
}

.sidebar-sub-item:active {
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  // border: 2px solid black;
  border-radius: 0.3rem;
  background: #eceff2;
  padding-bottom: 10px;
  padding-top: 10px;
}

.sidebar-sub-item-click {
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  // border: 2px solid black;
  border-radius: 0.3rem;
  background: #eceff2;
  padding: 10px;
}
</style>

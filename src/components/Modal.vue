<template>
  <teleport to="body">
    <transition name="modal-animation">
      <div v-show="modalActive" class="reusedModal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="reusedModal-inner">
            <div class="font-medium h3 mb-4">
              <i class="bi bi-clipboard"></i>
              {{ header }}
            </div>

            <i @click="close" class="bi bi-x-circle button-close-modal"></i>

            <div
              class="content  p-3 mb-4 rounded-3"
              :class='{
                "invalid": isInvalid,
                "": !isInvalid,
              }'
            >
              <slot />
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-danger pl-5 px-5 mx-3"
                @click="close"
                type="button"
              >
                CLOSE
              </button>
              <button
                class="btn btn-primary pl-5 px-5"
                @click="submit"
                type="button"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  modalActive: {
    type: Boolean,
    required: true,
  },
  header: {
    type: String,
    require: true,
    default: "Header",
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close", "submitModal"]);

const close = () => {
  emits("close");
};

const submit = () => {
  emits("submitModal");
};
</script>

<style lang="scss" scoped>
.content {
  border: 2px solid #eceff2;
}

.content.invalid {
  border-color: #dc3545;
}

.reusedModal {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}

.reusedModal-inner {
  box-shadow: inset 0 0.5rem 0.5rem rgba(134, 132, 132, 0.151);
  position: absolute;
  padding: 60px 16px;
  background: white;
  border-radius: 0.3rem;
  top: 50px;
  min-width: 600px;

  .button-close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
}

// animation
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>
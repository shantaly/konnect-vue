<template>
  <KongNav @nav-left-clicked="goToHomePage">
    <template #nav-left-content>
      <div class="nav-logo-container">
        <div class="nav-logo-container__kong">
          <img src="@/assets/svgs/kong.svg">
        </div>
        <div class="nav-logo-container__konnect">
          <img src="@/assets/svgs/konnect.svg">
        </div>
      </div>
    </template>
    <template #nav-right-content>
      <div
        v-for="(item, index) in navbarLinks"
        :key="index"
        class="nav-primary-button"
      >
        <img
          class="nav-primary-button__icon"
          :src="item.icon"
        >
        <span class="nav-primary-button__text">{{ item.text }}</span>
      </div>
      <div class="nav-profile-button">
        <img
          class="nav-profile-button__icon"
          src="@/assets/svgs/profile.svg"
        >
        <span class="nav-profile-button__text">{{ userFullName }}</span>
      </div>
    </template>
  </KongNav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import KongNav from '@/components/display/KongNav.vue'
import { NavbarLinks } from '@/types/navbarLinks.interface'
import groupIcon from '@/assets/svgs/group.svg'
import gearIcon from '@/assets/svgs/gear.svg'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    KongNav,
  },
  setup() {
    const router = useRouter()
    const userFullName = 'Katherine Ellis'
    let navbarLinks = new Array<NavbarLinks>()
    navbarLinks = [
      {
        icon: groupIcon,
        text: 'Organization',
      },
      {
        icon: gearIcon,
        text: 'Settings',
      },
    ]

    const goToHomePage = () => {
      router.push({ name: 'home' })
    }

    return { navbarLinks, userFullName, goToHomePage }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.nav-logo-container {
  display: flex;
  align-items: center;
  padding: 0 $d-x-small;
  &__kong {
    img {
      width: 29px;
      height: 25.48px;
    }
  }
  &__konnect {
    padding: 0 $d-xx-small;
    img {
      width: 99.45px;
      height: 14.33px;
    }
  }
}
.nav-primary-button {
  display: none;
  align-items: center;
  padding: $d-small $d-x-small;
  opacity: 0.8;
  cursor: pointer;
  &__icon {
    width: 20px;
    height: 20px;
  }
  &__text {
    margin-left: $d-xx-small;
    font-weight: 600;
    font-size: 15px;
    color: #ffffff;
    line-height: 18px;
  }
  &:hover {
    @include linear-gradient(180deg, #09224f 50%, #073382 100%);
  }
  @include breakpoint(medium) {
    display: flex;
  }
}

.nav-profile-button {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #072863;
  cursor: pointer;
  &__icon {
    width: 30px;
    height: 30px;
  }
  &__text {
    opacity: 0.8;
    margin-left: $d-x-small;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
  &:hover {
    @include linear-gradient(180deg, #09224f 50%, #073382 100%);
  }
}
</style>

<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <!-- 문자열 카운터를 위한 newTwitterContent -->
      <div class="col">
        <q-input 
          class="new-tweet"
            bottom-slots 
            v-model="newTwitterContent" 
            label="What's happening?!" 
            counter 
            maxlength="280" 
            :dense="dense"
            autogrow
          >
            <template v-slot:before>
              <q-avatar>
                <img src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/43583/elephant-emoji-clipart-md.png">
              </q-avatar>
            </template>
        </q-input>
      </div>
      
      <div class="col col-shrink">
        <q-btn
          class="q-mb-lg"
          :disabled="!newTwitterContent"
          unelevated 
          rounded 
          color="primary" 
          label="Tweet"
          no-caps
         />
      </div>
    </div>

    <q-separator 
      class="divider" 
      color="grey-2" 
      size="10px" 
    />
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newTwitterContent: ''
    }
  }
})
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>
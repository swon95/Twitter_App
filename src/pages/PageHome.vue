<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <!-- 문자열 카운터를 위한 newQweetContent -->
        <div class="col">
          <q-input 
              v-model="newQweetContent" 
              class="new-qweet"
              label="What's happening?!" 
              maxlength="280"
              bottom-slots 
              counter 
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
          <!-- @click => 클릭이벤트 추가 -->
          <q-btn
            @click="addNewQweet"
            class="q-mb-lg"
            :disabled="!newQweetContent"
            unelevated 
            rounded 
            color="primary" 
            label="Qweet"
            no-caps
           />
        </div>
      </div>
    
      <!-- 영역 구분 -->
      <q-separator 
        class="divider" 
        color="grey-2" 
        size="10px" 
      />
    
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
        <!-- v-for (루프) 메소드를 통해 페이지에 데이터를 뿌려줌 -->
        <!-- 현재 date 를 key 로 -->
        <q-item
         class="qweet q-py-md" 
         v-for="qweet in qweets" 
         :key="qweet.id" 
         >
          <q-item-section avatar top>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>
        
          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong>New User !</strong>
              <span class="text-grey-7">
                 @새로운 사용자
                <br class="lt-md">
                 &bull; {{ qweet.date | relativeDate }}
              </span>
            </q-item-label>
            <q-item-label class="qweet-content text-body1">
              {{ qweet.content }}
            </q-item-label>
          
            <div class="qweet-icons row justify-between">
              <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
              <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
              <q-btn 
                flat 
                round 
                size="sm" 
                @click="toggledLiked(qweet)"
                :color="qweet.liked ? 'pink' : 'grey'" 
                :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'" 
                />
              <q-btn @click="deleteQweet(qweet)" flat round size="sm" color="grey" icon="fas fa-trash" />
            </div>          
          </q-item-section>
        
          <q-item-section side top>
            
          </q-item-section>
        </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'
import db from 'src/boot/firebase'
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, getDoc, updateDoc  } from 'firebase/firestore'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: [
        // {
        //   id: 'ID1',
        //   content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur, culpa suscipit iure nostrum odio reprehenderit doloremque, at iusto minus expedita facilis molestiae, labore repudiandae tempore excepturi officiis obcaecati ex!',
        //   date: 1688484760117,
        //   // 좋아요 기능 추가
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur, culpa suscipit iure nostrum odio reprehenderit doloremque, at iusto minus expedita facilis molestiae, labore repudiandae tempore excepturi officiis obcaecati ex!',
        //   date: 1688484937176,
        //   liked: true
        // }
      ]
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
  // 새로운 게시글(Tweet) 추가
  methods: {
    addNewQweet() {
      // console.log('a')
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        // firebase doc 에 필드 추가
        liked: false
      }
      // 로컬에 새로운 글 작성 시 보여주기
      // this.qweets.unshift(newQweet) // push, unshift
      // 글 작성 시 Firebase 에 실시간으로 추가
      const FireCollection = collection(db, 'qweets');
      // db.collection('qweets').add(newQweet)
      addDoc(FireCollection, newQweet)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
      this.newQweetContent = ''
    },
    deleteQweet(qweet) {
      // // console.log('Delete Tweet: ', qweet)
      // // 글이 작성된 시간을 기준으로
      // const dateToDelete = qweet.date
      // // 몇번째 인덱스인지 배열에서 탐색
      // const index = this.qweets.findIndex(qweet => qweet.date === dateToDelete)
      // // console.log('index : ', index)
      // // splice 함수를 사용하여 배열에서 1개 제거
      // this.qweets.splice(index, 1)

      // firebase Collection 에서 
      const qweetsCollection = collection(db, 'qweets');
      const docRef = doc(qweetsCollection, qweet.id);

      // db.collection('qweets').doc(qweet.id).delete()
      deleteDoc(docRef)
        .then(() => {
          console.log('document successfully deleted!!')
          // 배열에서 해당 qweet 제거
          const index = this.qweets.findIndex(item => item.id === qweet.id)
          if (index !== -1) {
            this.qweets.splice(index, 1)
          }
        })
      .catch(function(error) {
        console.log('Error removing document: ', error)
      })
    },
    toggledLiked(qweet) {
      // console.log('toggleLiked')
      // qweet 을 console 에 출력하여 id 값을 확인
      // console.log(qweet)
      // var washingtonRef = dv.collection('cities').doc('DC')

      // // Set the "ccapital" field of the city 'DC'
      // return washingtonRef.update({
      //   capital: true
      // })
      // .then(function() {
      //   console.log("Document successfully updated!")
      // })
      // .catch(function() {
      //   // The document probablay doesn't exist.
      //   console.error("Error updating document: ", error)
      // })

      const qweetsCollection = collection(db, 'qweets');
      const docRef = doc(qweetsCollection, qweet.id);

      // Firestore에서 해당 문서를 가져옴
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            // 현재 좋아요 상태를 가져옴
            const currentLiked = doc.data().liked;
            // 좋아요 상태를 토글
            const updatedLiked = !currentLiked;
          
            // Firestore에서 문서를 업데이트
            updateDoc(docRef, { liked: updatedLiked })
              .then(() => {
                console.log('Document successfully updated!');
                // 배열에서 해당 qweet의 좋아요 상태 업데이트
                const index = this.qweets.findIndex((item) => item.id === qweet.id);
                if (index !== -1) {
                  this.qweets[index].liked = updatedLiked;
                }
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error getting document: ', error);
        });
    }
  },
  mounted() {
        // onSnapshot 메서드를 변경 시 모든 데이터의 snapShot 반환
        // db.collection('qweets')
        const qweetsCollection = collection(db, 'qweets');
        // firebase 쿼리(orderBy method)를 사용하여 오름차순(ascending)으로 정렬 // 내림차순 desc (descending)
        const qweetsQuery = query(qweetsCollection, orderBy('date', 'asc'));
        
        // qweetsCollection.onSnapshot(function(snapshot) 
        onSnapshot(qweetsQuery, (snapshot) => {
            // 변경사항을 아래 타입으로 가져옴
            snapshot.docChanges().forEach((change) => {
              const qweetChange = { 
                id: change.doc.id, 
                ...change.doc.data()
              }

              if (change.type === "added") {
                console.log("New qweet: ", qweetChange);
                this.qweets.unshift(qweetChange)
              }
              if (change.type === "modified") {
                  console.log("Modified qweet: ", qweetChange);
                  let index = 
                  this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
                  Object.assign(this.qweets[index], qweetChange)
                }
              if (change.type === "removed") {
                  console.log("Removed qweet: ", qweetChange);
                  // firebase doc delete
                  let index = 
                  // findIndex 함수를 통해 qweet id 와 qweetChange id 가 일치한다면
                  this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
                  // qweets 의 index 에서 1개의 요소를 제거
                  this.qweets.splice(index, 1)
              }
      })
    })
  }
})
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)

.qweet-content
  padding-top: 5px

.qweet-icons
  margin-left: -5px
</style>
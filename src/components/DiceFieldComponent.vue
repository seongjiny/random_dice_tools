<script setup lang="ts">
import { DICE_IMAGE_ARRAY, DICE_IMAGE_MAP } from 'src/components/images/image-loader';
import { ref } from 'vue';
const current_id = ref('qm');

const dice_id_array = ref([
    ['qm', 'qm', 'qm', 'qm', 'qm',],
    ['qm', 'qm', 'qm', 'qm', 'qm',],
    ['qm', 'qm', 'qm', 'qm', 'qm',],
]);


// console.log(dice_id_array.value[0][0]);
// console.log(DICE_IMAGE_MAP[(dice_id_array.value[0][0] as keyof DICE_IMAGE_MAP)]);

const getImageSrc = (i: number, j: number) => {
    i -= 1;
    j -= 1;
    return DICE_IMAGE_MAP[(dice_id_array.value[i][j] as keyof DICE_IMAGE_MAP)].src;
}

const resetField = () => {
    dice_id_array.value = [
        ['qm', 'qm', 'qm', 'qm', 'qm',],
        ['qm', 'qm', 'qm', 'qm', 'qm',],
        ['qm', 'qm', 'qm', 'qm', 'qm',],
    ]
}

</script>
<template>
    <q-page class="row q-mt-lg">
        <div class="column">
            <div>
                <img v-for="dice in DICE_IMAGE_ARRAY" :src="dice.src" :key="dice.name" @click="current_id = dice.id" />
            </div>
            <hr />
            <div class="row">
                <div class="column field-bg">
                    <div class="row" v-for="i in 3" :key="i">
                        <img v-for="j in 5" :src="getImageSrc(i, j)" :key="j"
                            @click="dice_id_array[i - 1][j - 1] = current_id" />
                    </div>
                </div>
                <div>
                    <q-btn @click="resetField()">리셋</q-btn>
                </div>
            </div>

            <hr />
            <div class="row q-my-md">
                선택된 주사위 :
                <img :src="DICE_IMAGE_MAP[current_id].src" />
            </div>
        </div>
    </q-page>
</template>

<style>
img {
    width: 50px;
    height: 50px;
}
div.field-bg {
    background-image: url('./../assets/battlefields/quantum.png');
    background-size: cover;
}
</style>
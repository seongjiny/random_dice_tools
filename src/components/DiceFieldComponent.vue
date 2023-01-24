<script setup lang="ts">
import useNotify from 'src/components/common/useNotify';
import { DICE_IMAGE_ARRAY, DICE_IMAGE_MAP } from 'src/components/images/image-loader';
import { ref, Ref } from 'vue';
const current_id = ref('qm');
const simMode = ref(false);
const current_moves = ref('');
const moves_array: Ref<string[]> = ref([]);
const uNotify = useNotify();
const temp = ref([
    ['qm', 'qm', 'qm', 'qm', 'qm',],
    ['qm', 'qm', 'qm', 'qm', 'qm',],
    ['qm', 'qm', 'qm', 'qm', 'qm',],
]);

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
    dice_id_array.value = temp.value.map(x => x.slice());
    moves_array.value.unshift(current_moves.value);
    current_moves.value = '';
    console.log(temp.value);
}

const clickEvent = (i: number, j: number) => {
    if (simMode.value) {
        // down
        if (i - 1 >= 0 && dice_id_array.value[i - 1][j] === 'core') {
            current_moves.value += '↓';
            dice_id_array.value[i - 1][j] = dice_id_array.value[i][j];
            dice_id_array.value[i][j] = 'core';
            // up
        } else if (i + 1 < dice_id_array.value.length && dice_id_array.value[i + 1][j] === 'core') {
            current_moves.value += '↑';
            dice_id_array.value[i + 1][j] = dice_id_array.value[i][j];
            dice_id_array.value[i][j] = 'core';
            // right
        } else if (j - 1 >= 0 && dice_id_array.value[i][j - 1] === 'core') {
            current_moves.value += '→';
            dice_id_array.value[i][j - 1] = dice_id_array.value[i][j];
            dice_id_array.value[i][j] = 'core';
            // left
        } else if (j + 1 < dice_id_array.value[0].length && dice_id_array.value[i][j + 1] === 'core') {
            current_moves.value += '←';
            dice_id_array.value[i][j + 1] = dice_id_array.value[i][j];
            dice_id_array.value[i][j] = 'core';
        } else {
            console.log('코어 상하 좌우만 가능');
        }
    } else {
        (dice_id_array.value)[i][j] = current_id.value;
    }
}

const startSimMode = () => {
    simMode.value = !simMode.value;
    if (simMode.value) {
        let core_count = 0;
        dice_id_array.value.forEach(subarr => {
            subarr.forEach(x => {
                if (x === 'core') core_count++;
            });
        })
        if (core_count != 1) {
            simMode.value = false;
            uNotify.negativeMessage(`코어의 숫자는 한개만 가능합니다.\n발견된 코어의 갯수 ${core_count}개`);
        }
    }
}

const saveField = () => {
    let core_count = 0;
    dice_id_array.value.forEach(subarr => {
        subarr.forEach(x => {
            if (x === 'core') core_count++;
        });
    })
    if (core_count != 1) {
        uNotify.negativeMessage(`코어의 숫자는 한개만 가능합니다.\n발견된 코어의 갯수 ${core_count}개`);
    } else {
        temp.value = dice_id_array.value.map(x => x.slice());
    }
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
                        <img v-for="j in 5" :src="getImageSrc(i, j)" :key="j" @click="clickEvent(i - 1, j - 1)" />
                    </div>
                </div>
                <div>
                    <q-btn glossy @click="resetField()">리셋</q-btn>
                    <q-btn glossy @click="startSimMode()">시뮬레이션 모드 {{ simMode? '중지': '시작' }}</q-btn>
                    <q-btn glossy @click="saveField()">현재 판 저장</q-btn>
                </div>
            </div>

            <hr />
            <div class="row q-my-md">
                선택된 주사위 :
                <img :src="DICE_IMAGE_MAP[current_id].src" />
            </div>
            <div class="column q-my-md">

                <div>현재: {{ current_moves }}</div>
                
                <div class="column">
                    <div> 기록관 </div>
                    <div v-for="move in moves_array" :key="move"> {{ move }}</div>
                </div>
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
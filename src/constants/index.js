export const ANIMATION_LEFT = 'LEFT';
export const ANIMATION_RIGHT = 'RIGHT';
export const ANIMATION_TURN = 'TURN';

export const SCENE_BOOT = 'BOOT';
export const SCENE_MAIN = 'MAIN';

export const TEXTURE_DUDE = 'DUDE';
export const TEXTURE_GROUND = 'GROUND';
export const TEXTURE_SKY = 'SKY';
export const TEXTURE_STAR = 'STAR';

export const NODE_TYPE = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    START: 'START',
    END: 'END'
};

export const EDGE_TYPE = {
    NORMAL_EDGE: 'NORMAL_EDGE',
    IFZERO_EDGE: 'IFZERO_EDGE'
};


export const BOX_CONFIG = {
    A:{
        id: 'A',
        color: '#e6194B',
        phaserColor: 0xe6194B
    },
    B:{
        id: 'B',
        color: '#3cb44b',
        phaserColor: 0x3cb44b
    },
    C:{
        id: 'C',
        color: '#ffe119',
        phaserColor: 0xffe119
    },
    D:{
        id: 'D',
        color: '#4363d8',
        phaserColor: 0x4363d8
    },
    E:{
        id: 'E',
        color: '#f58231',
        phaserColor: 0xf58231
    },
    F:{
        id: 'F',
        color: '#911eb4',
        phaserColor: 0x911eb4
    },
    G:{
        id: 'G',
        color: '#42d4f4',
        phaserColor: 0x42d4f4
    },
    H:{
        id: 'H',
        color: '#f032e6',
        phaserColor: 0xf032e6
    },
    I:{
        id: 'I',
        color: '#bfef45',
        phaserColor: 0xbfef45
    },
    J:{
        id: 'J',
        color: '#fabed4',
        phaserColor: 0xfabed4
    },
    K:{
        id: 'K',
        color: '#469990',
        phaserColor: 0x469990
    },
    L:{
        id: 'L',
        color: '#dcbeff',
        phaserColor: 0xdcbeff
    },
    M:{
        id: 'M',
        color: '#9A6324',
        phaserColor: 0x9A6324
    },
    N:{
        id: 'N',
        color: '#fffac8',
        phaserColor: 0xfffac8
    },
    O:{
        id: 'O',
        color: '#800000',
        phaserColor: 0x800000
    },
    P:{
        id: 'P',
        color: '#aaffc3',
        phaserColor: 0xaaffc3
    },
    Q:{
        id: 'Q',
        color: '#808000',
        phaserColor: 0x808000
    },
    R:{
        id: 'R',
        color: '#ffd8b1',
        phaserColor: 0xffd8b1
    },
    S:{
        id: 'S',
        color: '#000075',
        phaserColor: 0x000075
    },
    T:{
        id: 'T',
        color: '#a9a9a9',
        phaserColor: 0xa9a9a9
    }
};

export const LEVEL_CONFIG =
[
    {
        rule: (input)=>{return input[0]},
        title: 'Transfer (B = A)',
        description: 'I want an answer that puts A in B',
        inputBoxes: ['A'],
        outputBox: 'B'
    },
    {
        rule: (input)=>{return input[0] + 1},
        title: 'Increment (B= A + 1)',
        description: 'I want an answer that puts A + 1 in B',
        inputBoxes: ['A'],
        outputBox: 'B'
    },
    {
        rule: (input)=>{return input[0] * 2},
        title: 'Doublification (B= 2 * A)',
        description: 'I want an answer that puts the double of A in B',
        inputBoxes: ['A'],
        outputBox: 'B'
    },
    {
        rule: (input)=>{return input[0] * input[1]},
        title: 'Multiplication (C= B * A)',
        description: 'I want an answer that puts B * A in C',
        inputBoxes: ['A','B'],
        outputBox: 'C'
    }
];
<template>
    <div
        v-if="flex"
        class="flex-container"
        :class="[
            wrap && 'wrap',
            between && 'space-between',
            betweenXd && 'space-between-xd',
            betweenSd && 'space-between-sd',
            betweenMsd && 'space-between-msd',
            betweenMd && 'space-between-md',
            betweenLmd && 'space-between-lmd',
            betweenLd && 'space-between-ld',
            betweenMld && 'space-between-mld',
            betweenXld && 'space-between-xld',
            column && 'column',
            columnXd && 'column-xd',
            columnSd && 'column-sd',
            columnMsd && 'column-msd',
            columnMd && 'column-md',
            columnLmd && 'column-lmd',
            columnLd && 'column-ld',
            columnMld && 'column-mld',
            columnXld && 'column-xld',
            row && 'row',
            rowXd && 'row-xd',
            rowSd && 'row-sd',
            rowMsd && 'row-msd',
            rowMd && 'row-md',
            rowLmd && 'row-lmd',
            rowLd && 'row-ld',
            rowMld && 'row-mld',
            rowXld && 'row-xld',
            jcenter && 'space-center',
            around && 'space-around',
            acenter && 'align-center',
        ]"
        @click="$emit('click')"
    >
        <slot></slot>
    </div>

    <div
        v-else-if="grid"
        class="grid-container"
        :class="[
            xd && `cols-xd-${xd}`,
            sd && `cols-sd-${sd}`,
            msd && `cols-msd-${msd}`,
            md && `cols-md-${md}`,
            lmd && `cols-lmd-${lmd}`,
            ld && `cols-ld-${ld}`,
            mld && `cols-mld-${mld}`,
            xld && `cols-xld-${xld}`,
        ]"
        @click="$emit('click')"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VLayout',
    props: {
        flex: {
            type: Boolean,
            default: false,
        },
        wrap: {
            type: Boolean,
            default: false,
        },
        between: {
            type: Boolean,
            default: false,
        },

        betweenXd: {
            type: Boolean,
            default: false,
        },

        betweenSd: {
            type: Boolean,
            default: false,
        },

        betweenMsd: {
            type: Boolean,
            default: false,
        },

        betweenMd: {
            type: Boolean,
            default: false,
        },

        betweenLmd: {
            type: Boolean,
            default: false,
        },

        betweenLd: {
            type: Boolean,
            default: false,
        },

        betweenMld: {
            type: Boolean,
            default: false,
        },

        betweenXld: {
            type: Boolean,
            default: false,
        },

        column: {
            type: Boolean,
            default: false,
        },

        columnXd: {
            type: Boolean,
            default: false,
        },

        columnSd: {
            type: Boolean,
            default: false,
        },

        columnMsd: {
            type: Boolean,
            default: false,
        },

        columnMd: {
            type: Boolean,
            default: false,
        },

        columnLmd: {
            type: Boolean,
            default: false,
        },

        columnLd: {
            type: Boolean,
            default: false,
        },

        columnMld: {
            type: Boolean,
            default: false,
        },

        columnXld: {
            type: Boolean,
            default: false,
        },

        row: {
            type: Boolean,
            default: false,
        },

        rowXd: {
            type: Boolean,
            default: false,
        },

        rowSd: {
            type: Boolean,
            default: false,
        },

        rowMsd: {
            type: Boolean,
            default: false,
        },

        rowMd: {
            type: Boolean,
            default: false,
        },

        rowLmd: {
            type: Boolean,
            default: false,
        },

        rowLd: {
            type: Boolean,
            default: false,
        },

        rowMld: {
            type: Boolean,
            default: false,
        },

        rowXld: {
            type: Boolean,
            default: false,
        },

        around: {
            type: Boolean,
            default: false,
        },

        jcenter: {
            type: Boolean,
            default: false,
        },

        acenter: {
            type: Boolean,
            default: false,
        },

        grid: {
            type: Boolean,
            default: false,
        },

        xd: {
            type: String,
            default: '',
        },
        sd: {
            type: String,
            default: '',
        },
        msd: {
            type: String,
            default: '',
        },
        md: {
            type: String,
            default: '',
        },
        lmd: {
            type: String,
            default: '',
        },
        ld: {
            type: String,
            default: '',
        },
        mld: {
            type: String,
            default: '',
        },
        xld: {
            type: String,
            default: '',
        },
    },
}
// jcenterXd && 'space-center-xd',
//             jcenterSd && 'space-center-sd',
//             jcenterMsd && 'space-center-msd',
//             jcenterMd && 'space-center-md',
//             jcenterLmd && 'space-center-lmd',
//             jcenterLd && 'space-center-ld',
//             jcenterMld && 'space-center-mld',
//             jcenterXld && 'space-center-xld',
</script>

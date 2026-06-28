import { defineStore } from 'pinia';
export const useQuestionStore = defineStore('question', {
    state: () => ({
        subjectDropDown: [],
        gradeDropDown: [],
        examBoardDropDown: [],
        subjectList: [],
        gradeList: [],
        examBoardList: []
    }),

    actions: {
        async fetchSubjectDropdown() {
            try {
                const result = await useNuxtApp().$axios.get('unauth/subject-dropdown');
                if (result.data.response) {
                    this.subjectDropDown = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        },

        async fetchGradeDropdown() {
            try {
                const result = await useNuxtApp().$axios.get('grade-dropdown');
                if (result.data.response) {
                    this.gradeDropDown = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        },

        async fetchExamBoardDropdown() {
            try {
                const result = await useNuxtApp().$axios.get('exam-board-dropdown');
                if (result.data.response) {
                    this.examBoardDropDown = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        },

        async fetchSubject() {
            try {
                const result = await useNuxtApp().$axios.get('unauth/subject-group');
                if (result.data.response) {
                    this.subjectList = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        },

        async fetchGrade() {
            try {
                const result = await useNuxtApp().$axios.get('grade-web');
                if (result.data.response) {
                    this.gradeList = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        },

        async fetchExamBoard() {
            try {
                const result = await useNuxtApp().$axios.get('exam-board-web');
                if (result.data.response) {
                    this.examBoardList = result.data.data;
                }
            } catch (result) {
                return result.response;
            }
        }
    }
});

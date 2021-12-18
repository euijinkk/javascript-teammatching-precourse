import { $ } from '../utils/DOM.js';
import { getMatchingQuestion, getMatchingResult, TEAM_TEMPLATE } from '../utils/template.js';

export class TeamView {
  constructor() {
    this.$teamMain = $('#team-main');
    this.addElements();
  }

  setOnOptionsClick(fn) {
    this.$showTeamMatcherButton.addEventListener('click', (e) => {
      e.preventDefault();
      const courseOptionsIndex = this.$courseSelect.options.selectedIndex;
      const selectedCourse = this.$courseSelect.options[courseOptionsIndex].innerText;
      const missionOptionsIndex = this.$missionSelect.options.selectedIndex;
      const selectedMission = this.$missionSelect.options[missionOptionsIndex].innerText;
      fn(selectedCourse, selectedMission);
    });
  }

  setOnMatchButtonClick(fn, selectedCourse, selectedMission) {
    $('#match-team-button').addEventListener('click', (e) => {
      e.preventDefault();
      const headCountPerTeam = Number($('#team-member-count-input').value);

      fn(headCountPerTeam, selectedCourse, selectedMission);
    });
  }

  setOnReMatchButtonClick(fn, headCountPerTeam, selectedCourse, selectedMission) {
    $('#rematch-team-button').addEventListener('click', (e) => {
      e.preventDefault();
      fn(headCountPerTeam, selectedCourse, selectedMission);
    });
  }

  showMatchingQuestion(selectedCourse, selectedMission, crewList) {
    this.$teamMatchingSection.innerHTML = getMatchingQuestion(selectedCourse, selectedMission);
    this.showCrewList(crewList);
  }

  showCrewList(crewList) {
    const $crewList = $('#crew-list');
    crewList.map((crew) => ($crewList.innerHTML += `<li>${crew}</li>`));
  }

  showTeamMatchResult(selectedCourse, selectedMission, teamList) {
    this.$teamMatchingSection.innerHTML = getMatchingResult(selectedCourse, selectedMission);
    this.$teamMatchResult = $('#team-match-result');
    this.showTeamList(teamList);
  }
  showTeamList(teamList) {
    this.$teamMatchResult.innerHTML = '';
    for (let i = 0; i < teamList.length; i++) {
      this.$teamMatchResult.innerHTML += `<li>${teamList[i].join(',')}</li>`;
    }
  }

  addElements() {
    this.$teamMain.innerHTML = TEAM_TEMPLATE;
    this.$courseSelect = $('#course-select');
    this.$missionSelect = $('#mission-select');
    this.$showTeamMatcherButton = $('#show-team-matcher-button');
    this.$teamMatchingSection = $('#team-matching-section');
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { Questions } from '../../question';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.css']
})
export class AddQueComponent implements OnInit {
  modalRef: BsModalRef;
  selectedQuestion: any;
  component: any = [];

  constructor(public questionsService: QuestionsService,
    private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  ngOnInit() {
    this.questionsService.getQuestionsList();
    this.resetForm();
  }

  onAdd() {
    this.component.push({});
  }

  //Reset Form
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.questionsService.selectedQuestion = {
      id: null,
      queTitle: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    }
  }

  //Form Submit Method
  //if form don't have id then it will Add the User data
  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.questionsService.addQuestionData(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.questionsService.getQuestionsList();
        })
    }
    //if onclick on 'edit' it find the id then it Update the Selected User data 
    else {
      this.questionsService.putQuestionData(form.value.id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.questionsService.getQuestionsList();
        });
    }
  }

  //Object Assogn to selected user for edit 
  showForEdit(question: Questions) {
    this.questionsService.selectedQuestion = Object.assign({}, question);
  }

  onDelete(question, template) {
    this.selectedQuestion = question;
    this.modalRef = this.modalService.show(template);
  }

  //Delete modal click - we can soft delete user by changing status of Active and Deactive
  onConfirm(template) {
    this.questionsService.deleteQuestionData(this.selectedQuestion.id, this.selectedQuestion)
      .subscribe(data => {
        this.modalRef.hide();
        this.questionsService.getQuestionsList();
        // this.toastr.info('Record Updated Successfully!', 'User Register');
      });
  }

  //delete modal click - modal hide
  onCancel(template) {
    this.modalRef.hide();
  }
}

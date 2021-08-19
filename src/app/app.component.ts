import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators} from '@angular/forms'
import { Example } from './example';
import { ExampleService} from './example.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  examples: Example[] = []
  form: FormGroup = new FormGroup({
    description : new FormControl('',[Validators.required, Validators.minLength(3)] )
  })

constructor(
  private service: ExampleService
){}

ngOnInit(){
  this.listarExamples()
}

listarExamples(){
  this.service.listar().subscribe(exampleList =>
    this.examples = exampleList)
}

  submit(){
    const example: Example = {...this.form.value}
    this.service
        .salvar(example)
        .subscribe(savedExample => { 
          this.examples.push(savedExample)
          this.form.reset()
        }) 
  }
  delete(example: Example){
    this.service.deletar(example.id).subscribe({
      next: (response) => this.listarExamples()
    })
  }

  concluir(example: Example){
    this.service.concluir(example.id).subscribe({
      next: (exampleAtualizado) =>{
        example.done = exampleAtualizado.done
        example.dataConclusao = exampleAtualizado.dataConclusao
        }
      })
  }
}

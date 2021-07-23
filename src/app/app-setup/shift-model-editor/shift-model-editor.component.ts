import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from 'src/app/config.service';
import { Shift } from 'src/app/api/models';
import { ShiftControllerService, ShiftScheduleControllerService } from 'src/app/api/services';

@Component({
  selector: 'app-shift-model-editor',
  templateUrl: './shift-model-editor.component.html',
  styleUrls: ['./shift-model-editor.component.scss']
})
export class ShiftModelEditorComponent implements OnInit {
  shiftModelForm: FormGroup;
  fieldNameMaxLength: number = 8;
  fieldDescriptionMaxLength: number = 64;
  @Input() model: Shift = {
    name: '',
    description: '',
  };
  @Output() modelChange = new EventEmitter<Shift>();
  @Output() result = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private db: ShiftControllerService,
    private _schedules: ShiftScheduleControllerService,
    private _setup: ConfigService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.shiftModelForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.maxLength(this.fieldNameMaxLength),
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.maxLength(this.fieldDescriptionMaxLength),
      ])
    });
    if (this.model) {
      this.shiftModelForm.get('name').setValue(this.model.name);
      this.shiftModelForm.get('description').setValue(this.model.description);
    }
  }

  async addShift() {
    const result: Shift = {
      name: this.shiftModelForm.get('name').value,
      description: this.shiftModelForm.get('description').value,
    }
    try {
      const _sh = await this.db.find({
        filter: JSON.stringify({
          where: {
            name: result.name
          }
        })
      }).toPromise();
      if (_sh && _sh.length > 0) {
        if (this.model.name && this.model.name !== result.name) {
          // mise à jour des schedules
          const sched = await this._schedules.find({
            filter: JSON.stringify({
              where: {
                shift: this.model.name
              }
            })
          }).toPromise();
          if (sched && sched.length > 0) {
            for (let sh of sched) {
              await this._schedules.updateById({
                id: sh.id, 
                body: {
                  shift: result.name,
                  start: sh.start,
                  end: sh.end,
                  day: sh.day,
                  weekDay: sh.weekDay
                }
              }).toPromise();
            }
          }
          await this.db.updateById({
            id: _sh[0].id, 
            body: result
          }).toPromise();

        }else{
          await this.db.updateById({
            id: _sh[0].id, 
            body: result
          }).toPromise();
        }

      }else{
        if (this.model.name && this.model.name !== result.name) {
          // édition d'un modèle existant : mise à jour des schedules avec
          // recherche du modèle existant
          const edited = await this.db.find({
            filter: JSON.stringify({
              where: {
                name: this.model.name
              }
            })
          }).toPromise();
          // mise à jour des schedules
          const sched = await this._schedules.find({
            filter: JSON.stringify({
              where: {
                shift: this.model.name
              }
            })
          }).toPromise();
          if (sched && sched.length > 0) {
            for (let sh of sched) {
              await this._schedules.updateById({
                id: sh.id, 
                body: {
                  shift: result.name,
                  start: sh.start,
                  end: sh.end,
                  day: sh.day,
                  weekDay: sh.weekDay
                }
              }).toPromise();
            }
          }
          await this.db.create({body: result}).toPromise();
          if (edited && edited.length > 0) {
            for (let mod of edited) {
              await this.db.deleteById({id: mod.id}).toPromise();
            }
          }
        }else{
          await this.db.create({body: result}).toPromise();
        }
      }
      this._snackBar.open("Enregistré :-)", "X", {
        duration: this._setup.SNACKBAR_TIMEOUT_TIME
      });
      this.modelChange.emit(result);
      this.result.emit(true);
    } catch (e) {
      console.log(e);
      this._snackBar.open("Erreur lors de l'enregistrement du titre ou du commentaire", "X", {
        duration: this._setup.SNACKBAR_TIMEOUT_TIME
      });
    }
  }
  cancel() {
    this.result.emit(false);
  }

}

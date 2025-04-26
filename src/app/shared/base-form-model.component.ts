// path: shared/base-form-table.component.ts
import { Directive, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/components/helper/services/utility/utility.service';
import { TableProps } from 'src/app/components/models/tableProps.model';

export interface CrudService<T> {
  onGetAll(): any;
  onPostSave(data: Partial<T>): any;
  onPutEdit(data: T): any;
  onDelete?(id: number): any;
}

@Directive()
export abstract class BaseFormTableComponent<T> implements OnInit {
  abstract formFields: { [key: string]: any };
  abstract tableColumns: TableProps.FieldTable[];
  abstract entityName: string;
  abstract id: string;
  abstract service: CrudService<T>;

  FormItem!: FormGroup;
  inputState: 'Add' | 'Edit' = 'Add';
  visible = false;
  selectedRow = signal<T | null>(null);

  TableProps: TableProps.Table = {
    columns: [],
    datasource: [],
    pagination: 10,
    filteredBy: [],
    toolbars: ['Add', 'Edit'],
  };

  constructor(
    protected formBuilder: FormBuilder,
    protected utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.initComponent();
  }

  protected initComponent(): void {
    this.FormItem = this.formBuilder.group(this.formFields);
    this.TableProps.columns = this.tableColumns;
    this.TableProps.filteredBy = this.tableColumns.map(col => col.field);
    if(this.service.onDelete !== undefined) {
      this.TableProps.toolbars.push('Delete');
    }
    this.fetchData();
  }

  protected fetchData(): void {
    this.service.onGetAll().subscribe((res: any) => {
      this.TableProps.datasource = res.data;
    });
  }

  handleSelectedRow(event: any): void {
    this.selectedRow.set(event.data);
  }

  handleToolbarClick(action: 'Add' | 'Edit' | 'Delete'): void {
    this.inputState = action as 'Add' | 'Edit';

    switch (action) {
      case 'Add':
        this.visible = true
        break
      case 'Edit':
        this.FormItem.patchValue(this.selectedRow() || {});
        this.visible = true;
        break;
      case 'Delete':
        if(this.service.onDelete === undefined) return;
        const selected = this.selectedRow();
        if (!selected) return;

        this.utilityService.onShowingConfirmationAlert(
          'warning',
          `Hapus ${this.entityName}`,
          `Yakin ingin menghapus ${this.entityName} ini?`,
          () => {
            this.service.onDelete && this.service.onDelete((selected as any)[this.id]).subscribe(() => {
              this.fetchData();
              this.selectedRow.set(null);
              this.utilityService.onSuccessToast(`${this.entityName} berhasil dihapus.`);
            });
          },
          () => {}
        );
        break;
    }
  }

  handleSubmit(): void {
    if (this.FormItem.invalid) return;

    const payload = this.FormItem.value;

    if (this.inputState === 'Add') {
      console.log("Cek Payload", payload);  
      this.service.onPostSave(payload).subscribe((res: any) => {
        if (res.responseResult) {
          this.utilityService.onSuccessToast(res.message);
          this.visible = false;
          this.FormItem.reset();
          this.fetchData();
        }
      });
    } else if (this.inputState === 'Edit') {
      const selected = this.selectedRow();
      if (!selected) return;

      this.service.onPutEdit({ ...(selected as any), ...payload }).subscribe((res: any) => {
        if (res.responseResult) {
          this.utilityService.onSuccessToast(res.message);
          this.visible = false;
          this.FormItem.reset();
          this.fetchData();
        }
      });
    }
  }

  handleCancel(): void {
    this.visible = false;
    this.FormItem.reset();
  }

  get dialogHeader() {
    return this.inputState === 'Add' ? `Tambah ${this.entityName}` : `Edit ${this.entityName}`;
  }  
}

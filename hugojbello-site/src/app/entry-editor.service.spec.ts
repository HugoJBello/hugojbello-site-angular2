import { TestBed, inject } from '@angular/core/testing';

import { EntryEditorService } from './entry-editor.service';

describe('EntryEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryEditorService]
    });
  });

  it('should be created', inject([EntryEditorService], (service: EntryEditorService) => {
    expect(service).toBeTruthy();
  }));
});

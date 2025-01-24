import type { IEntity } from '@/model/generic/IEntity';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export class GenericStore<T extends IEntity> {
  items: Ref<T[]> = ref([]);
  filteredItems: Ref<T[]> = ref([]);
  loading: Ref<boolean> = ref(false);

  private name: string;
  private initialMockFunction: (() => Promise<T[]>) | null = null;

  constructor(name: string) {
    this.name = name;
  }

  enableMock(mockFunction: () => Promise<T[]>) {
    this.initialMockFunction = mockFunction;
  }

  disableMock() {
    this.initialMockFunction = null;
  }

  createStore(controller: any) {
    const initialMockFunction = this.initialMockFunction; // preserva o valor inicial de mockFunction
    return defineStore(this.name, {
      state: () => ({
        items: this.items,
        loading: this.loading,
        useMock: !!initialMockFunction, // armazena se o mock está ativado
        mockFunction: initialMockFunction, // armazena a função mock no estado
      }),
      actions: {
        async fetch(params: string = '') {
          this.loading = true;

          if (this.useMock && this.mockFunction) {
            // Usa a função de mock quando ativada
            const mockData = await this.mockFunction();
            this.items = mockData;
          } else {
            const data = await controller.getAll(params);
            this.items = data;
          }

          this.loading = false;
        },

        async save(item: T) {
          this.loading = true;
          await controller.create(item);

          await this.fetch('');

          this.loading = false;
        },

        async saveBulk(items: any) {
          this.loading = true;

          await controller.createBulk(items);
          
          await this.fetch('');
          this.loading = false;
        },

        async updateItem(Id: string, item: T) {
          this.loading = true;

          await controller.update(Id, item);
          
          await this.fetch('');
          
          this.loading = false;
        },

        async updateBulk(items: any) {
          this.loading = true;

          await controller.updateBulk(items);
          
          await this.fetch('');
          this.loading = false;
        },

        deleteItemLocally(id: string): void {
          this.items = this.items.filter((item: any) => item.Id !== id);
      },
      
        async deleteItem(Id: string) {
          this.loading = true;
          
          try {
            this.items = this.items.filter((item) => item.Id !== Id);
            await controller.delete(Id);
            await this.fetch('');
            
          } catch (error) {
            this.loading = false;
          }
        },
        
        async filter(route: string) {
          this.loading = true;
          if (!this.useMock || !this.mockFunction) {
            const data = await controller.filter(route)
            this.items = data;
          } else {
            const mockData = await this.mockFunction();
            this.items = mockData;
          }
          this.loading = false;
        }
      },
    })();
  }
}
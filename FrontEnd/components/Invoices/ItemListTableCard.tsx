"use client";


import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check, GripVertical, ChevronsUpDown } from "lucide-react";

export function ItemListCard() {
    
  const [items, setItems] = useState([
    {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      price: 0,
      discount: 0,
      tax: 0,
      discountType: "percentage",
      isOpen: false,
    },
  ]);
  const [availableItems] = useState(["item1", "item2", "item3"]);

  const itemPriceMap = {
    item1: 100,
    item2: 200,
    item3: 300,
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: "",
        quantity: 1,
        price: 0,
        discount: 0,
        tax: 0,
        discountType: "percentage",
        isOpen: false,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleItemChange = (id, selectedItem) => {
    const price = itemPriceMap[selectedItem] || 0;
    updateItem(id, "name", selectedItem);
    updateItem(id, "price", price);
    updateItem(id, "isOpen", false);
  };

  const togglePopover = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    const priceAfterDiscount =
      item.discountType === "percentage"
        ? item.price - (item.price * item.discount) / 100
        : item.price - item.discount;

    const priceWithTax = priceAfterDiscount + item.tax;
    return item.quantity * priceWithTax;
  };

  const calculateSubtotal = () =>
    items.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">Item List</h2>

      <div className="overflow-x-auto">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border w-6"></th>
                  <th className="px-4 py-2 border">Item Name</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Discount</th>
                  <th className="px-4 py-2 border">Tax</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    togglePopover={togglePopover}
                    handleItemChange={handleItemChange}
                    availableItems={availableItems}
                    calculateItemTotal={calculateItemTotal}
                  />
                ))}
              </tbody>

              <tfoot className="bg-gray-100 text-gray-700">
                <tr>
                  <td colSpan={6} className="px-4 py-2 border">
                    <Button
                      variant="outline"
                      onClick={addItem}
                      className="border-green-600 text-green-600 hover:bg-green-100"
                    >
                      + Add Item
                    </Button>
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    Subtotal: Rs. {calculateSubtotal().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortableRow({
  item,
  updateItem,
  removeItem,
  togglePopover,
  handleItemChange,
  availableItems,
  calculateItemTotal,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} className="bg-white">
      <td className="px-2 py-2 border cursor-move" {...listeners}>
        <GripVertical className="h-4 w-4 text-gray-400" />
      </td>
      <td className="px-4 py-2 border w-48">
        <Popover open={item.isOpen} onOpenChange={() => togglePopover(item.id)}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
              aria-expanded={item.isOpen.toString()}
            >
              {item.name || "Choose an item"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search items..." />
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {availableItems.map((itemName) => (
                  <CommandItem
                    key={itemName}
                    value={itemName}
                    onSelect={() => handleItemChange(item.id, itemName)}
                  >
                    <Check
                      className="mr-2 h-4 w-4"
                      style={{ opacity: item.name === itemName ? "100" : "0" }}
                    />
                    {itemName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </td>
      <td className="px-4 py-2 border w-32">
        <Input
          type="number"
          min={0}
          value={item.quantity}
          onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
        />
      </td>
      <td className="px-4 py-2 border w-32">
        <Input
          type="number"
          min={0}
          value={item.price}
          onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
        />
      </td>
      <td className="px-4 py-2 border w-32">
        <div className="flex space-x-2">
          <Input
            type="number"
            min={0}
            value={item.discount}
            onChange={(e) => updateItem(item.id, "discount", Number(e.target.value))}
            className="w-24"
          />
          <select
            value={item.discountType}
            onChange={(e) => updateItem(item.id, "discountType", e.target.value)}
            className="w-24"
          >
            <option value="percentage">%</option>
            <option value="flat">Flat</option>
          </select>
        </div>
      </td>
      <td className="px-4 py-2 border w-32">
        <Input
          type="number"
          min={0}
          value={item.tax}
          onChange={(e) => updateItem(item.id, "tax", Number(e.target.value))}
          className="w-24"
        />
      </td>
      <td className="px-4 py-2 border text-gray-600">
        Rs. {calculateItemTotal(item).toFixed(2)}
      </td>
      <td className="px-4 py-2 border">
        <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

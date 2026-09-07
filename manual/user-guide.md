# User Guide

This guide outlines interaction patterns for the interface components of the Simeza platform.

## Gallery / Loop Dialog Interaction

The gallery dialog provides interactive access to artwork and media assets. The functionality of the interface buttons is determined by the `status` field of the selected item in the source JSON data.

| Status | Download Button State | User Interaction |
| :--- | :--- | :--- |
| **Available** | Activated (Enabled) | Clicking downloads the asset. |
| **Protected** | N/A (Forbidden) | Mouse cursor changes to a forbidden icon; interaction is prevented. |
| **Archived** | Disabled | Button appears greyed out; no action occurs on click. |
